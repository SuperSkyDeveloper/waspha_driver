import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OnlineOfflineView from './OnlineOfflineView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {BackHandler, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  changeOnlineStatusRequest,
  setUserData,
  updateInRegion,
  updateUserData,
} from '../../actions/UserActions';
import {
  calculateTripsEarnings,
  GetCurrentTimeInISO,
  isSameDateToday,
} from '../../helpers/generalHelper';
import {tripsAndOrdersRequest} from '../../actions/TripsAndOrdersActions';
import {getActiveOrdersRequest} from '../../actions/OrdersActions';

import {getCurrentRegion} from '../../services/GeneralHelper';
import {Notifications} from 'react-native-notifications';

import {
  setChannelForAndroid,
  getPermissions,
  updateDeviceToken,
  showLocalNotification,
  navigateOnNotificationTap,
} from '../../helpers/firebaseHelper';
import {startTracking, stopTracking} from '../../helpers/trackingHelper';
import {saveZoneRequest} from '../../actions/ZoneActions';
import {alertMessage} from '../../actions/GeneralActions';
import {
  BATTTERY_DOWN_LIMIT,
  RIDER_TYPE,
  strings,
  ZONE_OPTIONS,
} from '../../constants';
import SocketHelper from '../../helpers/SocketHelper';

class OnlineOfflineController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: getCurrentRegion().then((res) => {
        return {
          latitude: res.lat,
          longitude: res.lng,
        };
      }),

      isOnline: false,
      totalAmountListing: false,
      allTrips: [],
      totalSales: 0,
      tripsRenderList: [],
      showTotalSales: true,
      onlineStatusLoading: false,
      earningLoader: true,
      loading: true,
      isBackHandler: false,
      isFreeZoneModal:
        props.user.zone_option === ZONE_OPTIONS.FREE_ZONE &&
        _.isNil(props.user.free_zone_radius),
      freeZoneRadius: 0,
      showRegions: props.fromZoneOptions,
    };
  }
  static propTypes = {
    trips: PropTypes.array,
    orders: PropTypes.array,
    activeOrders: PropTypes.array,
    fromZoneOptions: PropTypes.bool,
  };

  static defaultProps = {
    trips: [],
    orders: [],
    activeOrders: [],
    fromZoneOptions: false,
  };

  componentDidMount() {
    if (!_.isEmpty(this.props.user.access_token)) {
      this._fcmInit();
    }
    this.getLocation();

    this.getTripsEarningRequest();
    startTracking();

    if (this.props.user.type === RIDER_TYPE.WASPHA_EXPRESS) {
      console.log('initsocket express');

      this.initSocket();
    }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  backHandlerModal = () => {
    return this.setState({
      isBackHandler: false,
    });
  };
  handleBackButtonClick = () => {
    if (Actions.state.index === 0) {
      this.setState({
        isBackHandler: true,
      });

      return true;
    }
    return false;
  };
  componentDidUpdate(prevProps, prevState) {
    console.log({fromZoneOptions: this.props.fromZoneOptions});
    // if (
    //   this.props.fromZoneOptions !== prevProps.fromZoneOptions &&
    //   this.props.fromZoneOptions
    // ) {

    //   this.setState({showRegions: true});
    // }

    if (
      this.props.riderOnlineStatus &&
      prevProps.riderOnlineStatus !== this.props.riderOnlineStatus
    ) {
      this.checkOngoingOrders();
      this.checkBatteryLevel();
    }
    if (
      !this.props.riderOnlineStatus &&
      prevProps.riderOnlineStatus !== this.props.riderOnlineStatus &&
      _.isNil(this.props.user.fixed_zone_id) &&
      _.isNil(this.props.user.free_zone_radius)
    ) {
      stopTracking();
    }
  }

  componentWillUnmount() {
    clearInterval(this.batteryCheckIntervalID);

    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    if (!_.isEmpty(this.props.user.access_token)) {
      this.registerRemoteNotifications &&
        this.registerRemoteNotifications.remove();
      this.registerRemoteNotificationsRegistered &&
        this.registerRemoteNotificationsRegistered.remove();
      this.registerRemoteNotificationsRegistrationFailed &&
        this.registerRemoteNotificationsRegistrationFailed.remove();
      this.registerNotificationReceivedForeground &&
        this.registerNotificationReceivedForeground.remove();
      this.registerNotificationOpened &&
        this.registerNotificationOpened.remove();
      this.registerNotificationReceivedBackground &&
        this.registerNotificationReceivedBackground.remove();
    }
  }

  initSocket = () => {
    console.log('initsocket');
    const {user} = this.props;
    SocketHelper.disconnect();
    SocketHelper.connect(() => {
      console.log('vendor is connected.');
      SocketHelper.emit('express_driver', {userID: user.id});
      // connect callback
      // event listners
      SocketHelper.onDisconnect();
      SocketHelper.stillConnected();

      SocketHelper.getExpressDriverInfo(this.checkRiderOnlineStatus); // checks for change in rider time and km from store
    });
  };

  checkRiderOnlineStatus = (isOnline) => {
    const {alertMessage, updateInRegion} = this.props;
    console.log('checkRiderOnlineStatus');

    if (!(isOnline === this.props.user.is_online)) {
      // start loading
      this.setState({
        onlineStatusLoading: true,
      });
      console.log('checkRiderOnlineStatusInside');

      const {coordinates} = this.state;
      const payload = {
        is_online: isOnline,
        location: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
      };

      this.props.changeOnlineStatusRequest(payload, () => {
        if (!isOnline) {
          updateInRegion(false);
          alertMessage(strings.OUT_OF_SELECTED_ZONE);
        } else {
          updateInRegion(true);
        }
        // stop loading
        this.setState({
          onlineStatusLoading: false,
        });
      });
    }
  };

  _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    this.registerRemoteNotifications =
      Notifications.registerRemoteNotifications();
    console.log('asdiksajdkkaj');

    Notifications.getInitialNotification()
      .then((notification) => {
        console.log({notification});
        if (!_.isNil(notification) && _.isNil(notification.data)) {
          console.log(
            'Initial notification was:',
            // notification ? notification.payload : 'N/A',
          );

          navigateOnNotificationTap(notification.payload);
        }
      })

      .catch((err) => {
        console.error('getInitialNotifiation() failed', err);
      });

    this.registerRemoteNotificationsRegistered =
      Notifications.events().registerRemoteNotificationsRegistered((event) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      });
    this.registerRemoteNotificationsRegistrationFailed =
      Notifications.events().registerRemoteNotificationsRegistrationFailed(
        (event) => {
          console.error(event);
        },
      );

    this.registerNotificationReceivedForeground =
      Notifications.events().registerNotificationReceivedForeground(
        (notification, completion) => {
          console.log('Notification Received - Foreground', notification);

          if (
            notification &&
            notification.payload &&
            notification.payload.data &&
            notification.payload.data.isLocal
          ) {
            // return;
          } else {
            showLocalNotification(notification.payload);
          }

          // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
          completion({alert: true, sound: true, badge: false});
        },
      );

    this.registerNotificationOpened =
      Notifications.events().registerNotificationOpened(
        (notification, completion, action) => {
          console.log('Notification opened by device user', notification);

          navigateOnNotificationTap(notification.payload);

          completion();
        },
      );

    this.registerNotificationReceivedBackground =
      Notifications.events().registerNotificationReceivedBackground(
        (notification, completion) => {
          console.log(
            'Notification Received - Background',
            notification.payload,
          );

          // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
          completion({alert: true, sound: true, badge: false});
        },
      );
  };

  checkBatteryLevel = () => {
    this.batteryCheckIntervalID = setInterval(() => {
      if (
        !_.isEmpty(this.props.user) &&
        this.props.user.is_approved &&
        this.props.user.is_online
      ) {
        DeviceInfo.getBatteryLevel().then((level) => {
          // console.log({level});
          let batteryLevel = level * 100;
          if (batteryLevel < BATTTERY_DOWN_LIMIT) {
            this.setRiderOffline();
          }
        });
      }
    }, 1000);
  };

  setRiderOffline = () => {
    //sets the online/offline status of rider
    // start loading
    const {alertMessage} = this.props;
    this.setState({
      onlineStatusLoading: true,
    });

    const payload = {
      is_online: false,
    };
    clearInterval(this.batteryCheckIntervalID);

    this.props.changeOnlineStatusRequest(payload, () => {
      // stop loading
      alertMessage('Your battery is low, kindly charge your device');
      this.setState({
        onlineStatusLoading: false,
      });
    });
  };

  selectRegion = (region = null) => {
    const {saveZoneRequest, alertMessage, updateUserData} = this.props;
    const {freeZoneRadius} = this.state;
    this.setState({loading: true});
    let payload = {};
    if (this.props.user.zone_option === ZONE_OPTIONS.FREE_ZONE) {
      updateUserData({fixed_zone_id: null});

      payload = {free_zone_radius: freeZoneRadius};
    } else {
      updateUserData({free_zone_radius: null});

      payload = {
        fixed_zone_id: region.id,
      };
    }
    saveZoneRequest(payload, (status) => {
      this.setState({loading: false});

      if (status) {
        this.setState({isFreeZoneModal: false, showRegions: false});
        alertMessage('Region Selected Successfully');
      }
    });
  };

  checkOngoingOrders = () => {
    const {getActiveOrdersRequest} = this.props;

    if (
      !_.isNil(this.props.user.fixed_zone_id) ||
      !_.isNil(this.props.user.free_zone_radius)
    ) {
      startTracking();
    }

    if (_.isEmpty(this.props.orderRequest)) {
      getActiveOrdersRequest((response) => {
        if (response) {
          startTracking();
        }
      });
      return true;
    }
    startTracking();
  };

  getTripsEarningRequest = () => {
    // request for trips and order

    const payload = {day: GetCurrentTimeInISO()};
    this.props.tripsAndOrdersRequest(payload, (status) => {
      this.setState({
        earningLoader: false,
      });
      if (status) {
        // calculate earning
        this.calculateTotalAmount();
      }
    });
  };

  //calculates the total sales made by rider
  calculateTotalAmount = () => {
    // here calculate all trips
    const {trips} = this.props;
    const tempTrips = _.cloneDeep(trips);

    // add first card of today total earning
    tempTrips.unshift({
      id: 0,
      date: GetCurrentTimeInISO(),
      earning: calculateTripsEarnings(trips),
    });

    this.setState({
      tripsRenderList: tempTrips,
    });
  };

  setValue = (key) => {
    this.setState(key);
  };

  //this toggles the modal of trips
  toggleModal = (showTotalSales = true) => {
    this.setState({
      totalAmountListing: !this.state.totalAmountListing,
      showTotalSales,
    });
  };

  //sets the online/offline status of rider
  setAvailabilityStatus = (val) => {
    // start loading
    this.setState({
      onlineStatusLoading: true,
    });

    const {coordinates} = this.state;
    const payload = {
      is_online: true,
      location: {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      },
    };

    this.props.changeOnlineStatusRequest(payload, () => {
      // stop loading
      this.setState({
        onlineStatusLoading: false,
      });
    });
  };

  //gets the location coordinates of rider
  getLocation = async () => {
    const {setUserData} = this.props;
    let cords;
    let a = await util.checkIsLocation();

    a
      ? (cords = await util.getCoordinates())
      : this.setState({isOnline: false});
    this.setState({loading: false});
    const {coordinates} = cords;
    let myCords = {};

    if (_.isUndefined(coordinates)) {
      getCurrentRegion().then((res) => {
        myCords = {
          latitude: res.lat,
          longitude: res.lng,
        };
      });
    } else {
      myCords = coordinates;
    }

    setUserData({['coordinates']: myCords});
    this.setState({coordinates: myCords}, () => {});
  };

  render() {
    const {
      coordinates,
      isOnline,
      totalAmountListing,
      totalSales,
      tripsRenderList,
      showTotalSales,
      onlineStatusLoading,
      earningLoader,
      loading,
      isBackHandler,
      isFreeZoneModal,
      freeZoneRadius,
    } = this.state;
    return (
      <OnlineOfflineView
        earningLoader={earningLoader}
        onlineStatusLoading={onlineStatusLoading}
        coordinates={coordinates}
        isOnline={isOnline}
        totalAmountListing={totalAmountListing}
        totalSales={totalSales}
        loading={loading}
        tripsRenderList={tripsRenderList}
        showTotalSales={showTotalSales}
        isFreeZoneModal={isFreeZoneModal}
        freeZoneRadius={freeZoneRadius}
        showRegions={this.state.showRegions}
        setAvailabilityStatus={(data) => this.setAvailabilityStatus(data)}
        selectRegion={this.selectRegion}
        toggleModal={this.toggleModal}
        setValue={(data) => this.setValue(data)}
        BackHandler={() => BackHandler.exitApp()}
        backHandlerModal={this.backHandlerModal}
        isBackHandler={isBackHandler}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({trips, orders, user, requests}) => ({
  user: user.data,
  trips: trips.trips,
  orders: orders.orders,
  riderOnlineStatus: user.data.is_online,
  activeOrders: orders.activeOrders,
  orderRequest: requests.requests[0],
  isInRegion: user.isInRegion,
});

const actions = {
  setUserData,
  changeOnlineStatusRequest,
  tripsAndOrdersRequest,
  getActiveOrdersRequest,
  saveZoneRequest,
  alertMessage,
  updateUserData,
  updateInRegion,
};

export default connect(mapStateToProps, actions)(OnlineOfflineController);
