import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging';
import DataHandler from '../services/DataHandler';
import {updateDeviceTokenRequest} from '../actions/GeneralActions';
import {Actions} from 'react-native-router-flux';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATIONS,
  TRIP_TYPE,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  strings,
  ZONE_OPTIONS,
} from '../constants';
import Util from '../util';
import {GetCurrentTimeInISO} from '../helpers/generalHelper';
import {isOrderRatedRequest} from '../actions/RequestsActions';
import firebase from '@react-native-firebase/app';
import {Images} from '../theme';
import {CHAT_SERVER} from '../RocketChat/RCConstants';
import {Notifications} from 'react-native-notifications';
import {getProfileDetailRequest, updateUserData} from '../actions/UserActions';

const LOG = false;

const updateDeviceToken = async (token) => {
  let fcmToken = '';
  if (_.isUndefined(token)) {
    fcmToken = await firebase.messaging().getToken();
  }

  if (fcmToken || token)
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        device_token: fcmToken || token,
        devicePlatform: Platform.OS,
      }),
    );

  return fcmToken || token;
};
const setChannelForAndroid = async () => {
  await Notifications.setNotificationChannel({
    channelId: NOTIFICATION_CHANNEL.id,
    name: NOTIFICATION_CHANNEL.name,
    importance: 5,
    description: NOTIFICATION_CHANNEL.name,
    enableLights: true,
    enableVibration: true,
    // groupId: 'your-group',
    // showBadge: true,
    // soundFile: 'custom_sound.mp3', // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
  });
};

const getPermissions = async () => {
  let authStatus = messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    try {
      authStatus = await messaging().requestPermission();
    } catch (error) {
      Util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR);
    }
  }

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const showLocalNotification = async (data) => {
  console.log({showLocalNotificationData: data});

  const {title, body, type, notification_time, id, silent} = data;
  console.log({silent});
  if (silent === 'true') {
    navigateOnNotificationTap(data);
    return true;
  }

  const someId = Math.floor(Math.random() * 10) + '';

  !_.isNil(data.extra_data) && !_.isEmpty(data.extra_data)
    ? Notifications.postLocalNotification({
        body,
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId},
        type,
        extra_data: data.extra_data,
      })
    : Notifications.postLocalNotification({
        body,
        title,
        sound: 'default',
        silent: false,
        data: {isLocal: true, id: someId},
        type,
      });

  if (type === NOTIFICATIONS.ACCOUNT_DISAPPROVED) {
    navigateOnNotificationTap(data);
  }

  if (type === NOTIFICATIONS.REVIEW_RECEIVED) {
    DataHandler.getStore().dispatch(
      updateUserData({avg_rating: JSON.parse(data.extra_data).avg_rating}),
    );
  }
};

const clearAllNotifications = () => {
  firebase.notifications().removeAllDeliveredNotifications();
};

const clearBadgeNumber = () => {
  if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
};
const navigateOnNotificationTap = (data, fromNotificationList = false) => {
  console.log({asdfsadfas: data});
  const cloneData = _.cloneDeep(data);
  // firebase.notifications().removeDeliveredNotification(data.id);
  switch (
    !_.isNil(JSON.parse(cloneData.extra_data).notificationType)
      ? JSON.parse(cloneData.extra_data).notificationType
      : cloneData.type
  ) {
    case NOTIFICATIONS.ORDER_REQUEST_RECEIVED:
      const requestId = JSON.parse(cloneData.extra_data).id;

      DataHandler.getStore().dispatch(
        isOrderRatedRequest({request_id: requestId}, (response) => {
          if (response.status && !response.data.is_rated) {
            if (
              (moment(
                JSON.parse(cloneData.extra_data).expiry_time,
              ).isSameOrBefore(GetCurrentTimeInISO()) &&
                (response.data.request_status === TRIP_TYPE.PENDING ||
                  response.data.request_status === 'expired' ||
                  response.data.request_status === 'cancelled' ||
                  response.data.request_status === 'rejected')) ||
              response.data.request_status === 'cancelled' ||
              response.data.request_status === 'rejected'
            ) {
              console.log({
                dataTime: moment(
                  JSON.parse(cloneData.extra_data).expiry_time,
                ).isSameOrBefore(GetCurrentTimeInISO()),
              });
              if (Actions.currentScene === 'notification') {
                return Actions.replace('notification');
              } else {
                return Actions.notification();
              }
            } else {
              const request =
                DataHandler.getStore().getState().requests.requests[0];
              if (
                !_.isNil(request) &&
                request.request_id === requestId &&
                request.status !== TRIP_TYPE.PENDING
              ) {
                return Actions.replace('acceptOrder', {fromNotification: true});
              }
              if (Actions.currentScene === 'requestOrder') {
                return Actions.replace('requestOrder', {
                  requestId: requestId,
                });
              } else {
                return Actions.requestOrder({
                  requestId: requestId,
                });
              }
            }
          } else {
            if (Actions.currentScene === 'notification') {
              Actions.replace('notification');
            } else {
              Actions.notification();
            }
          }
        }),
      );

      break;

    case NOTIFICATIONS.CHAT_NOTIFICATION:
      console.log('Chat Noti');
      const data = JSON.parse(cloneData.extra_data);
      let RcNames = data.name.split('--');

      let userImage = `${CHAT_SERVER}/avatar/${data.senderName}`;

      chatPersonName = _.capitalize(data.senderName).split('_')[0];

      Actions.rocketChatContainer({
        fromChatNotification: true,
        fromListChannelName: data.name,
        chattingWithPersonName:
          RcNames.length > 3
            ? `${strings.WASPHA} @ Order ID ${RcNames[1]}`
            : chatPersonName,
        // isChatActive:isActive,
        userAvatar: RcNames.length > 3 ? Images.WasphaIcon : userImage,
      });

      break;

    case NOTIFICATIONS.ORDER_CANCELLED:
      if (Actions.currentScene === 'notification') {
        Actions.replace('notification');
      } else {
        Actions.notification();
      }
      break;

    case NOTIFICATIONS.REVIEW_RECEIVED:
      // DataHandler.getStore().dispatch(
      //   updateUserData({avg_rating: JSON.parse(cloneData.extra_data).avg_rating}),
      // );

      if (Actions.currentScene === 'ratingsList') {
        Actions.replace('ratingsList');
      } else {
        Actions.ratingsList();
      }
      break;

    case NOTIFICATIONS.LOYALTY_POINTS_UPDATED:
      DataHandler.getStore().dispatch(
        updateUserData({
          loyalty_points: JSON.parse(cloneData.extra_data).loyalty_points,
        }),
      );

      break;

    case NOTIFICATIONS.ACCOUNT_APPROVED: {
      if (DataHandler.getStore().getState().user.data.is_approved) {
        return Actions.replace('notification');
      }

      DataHandler.getStore().dispatch(updateUserData({is_approved: true}));
      DataHandler.getStore().dispatch(getProfileDetailRequest(() => {}));
      if (
        JSON.parse(cloneData.extra_data).zone_option === ZONE_OPTIONS.FIXED_ZONE
      ) {
        Actions.reset('drawerMenu');
        Actions.refresh({fromZoneOptions: true});
      } else if (
        JSON.parse(cloneData.extra_data).zone_option === ZONE_OPTIONS.FREE_ZONE
      ) {
        Actions.reset('drawerMenu');
      } else {
        return Actions.reset('zoneOptions');
      }
      break;
    }

    case NOTIFICATIONS.ACCOUNT_DISAPPROVED: {
      if (fromNotificationList) {
        return Actions.replace('notification');
      }

      DataHandler.getStore().dispatch(updateUserData({is_approved: false}));

      Actions.reset('start');
      break;
    }

    case NOTIFICATIONS.MESSAGE_FROM_ADMIN: {
      if (!DataHandler.getStore().getState().user.data.is_approved) {
        console.log('JDHDHDH');
        console.log(Actions.currentScene);

        return Actions.replace('_waiting', {fromNotification: Date.now()}); //drawer child have '_' before it, in navigator file it is "waiting"
      } else if (Actions.currentScene === 'notification') {
        Actions.replace('notification');
      } else {
        Actions.notification();
      }
      break;
    }

    default: {
      Actions.reset('drawerMenu');
    }
  }
};

export {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  clearBadgeNumber,
  clearAllNotifications,
  navigateOnNotificationTap,
};
