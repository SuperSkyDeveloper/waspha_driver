import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import WaitingView from './WaitingView';
import {connect} from 'react-redux';
import {Notifications} from 'react-native-notifications';
import {
  getProfileDetailRequest,
  userSignOutRequest,
} from '../../actions/UserActions';
import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap,
} from '../../helpers/firebaseHelper';
import {Actions} from 'react-native-router-flux';
import {BackHandler} from 'react-native';
import {ZONE_OPTIONS} from '../../constants';
import util from '../../util';

class WaitingController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutLoader: false,
      refreshLoader: false,
      isNotification: props.fromNotification ? true : false,
    };
  }
  static propTypes = {fromNotification: PropTypes.bool};
  static defaultProps = {fromNotification: false};

  componentDidMount() {
    this.handleRefreshProfile();
    if (!_.isEmpty(this.props.user.access_token)) {
      this._fcmInit();
    }

    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prev', prevState.isNotification);

    console.log('current', this.state.isNotification);
    if (
      prevState.isNotification !== this.state.isNotification &&
      this.state.isNotification
    ) {
      this.handleRefreshProfile();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);

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

  backHandle = () => {
    BackHandler.exitApp();
    Actions.reset('start');
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

  // handle Logout
  handleLogout = () => {
    this.setState({
      logoutLoader: true,
    });
    this.props.userSignOutRequest((status) => {
      this.setState({
        logoutLoader: false,
      });
      if (status) {
        Actions.reset('login');
      }
    });
  };

  // handle refresh
  handleRefreshProfile = () => {
    this.setState({
      refreshLoader: true,
      isNotification: false,
    });
    this.props.getProfileDetailRequest((status) => {
      this.setState({
        refreshLoader: false,
      });
      if (status && this.props.user.is_approved) {
        if (this.props.user.zone_option === ZONE_OPTIONS.FIXED_ZONE) {
          Actions.reset('drawerMenu');
          Actions.refresh({fromZoneOptions: true});
        } else if (this.props.user.zone_option === ZONE_OPTIONS.FREE_ZONE) {
          Actions.reset('drawerMenu');
        } else {
          return Actions.reset('zoneOptions');
        }
      }
    });
  };

  render() {
    const {logoutLoader, refreshLoader} = this.state;
    return (
      <WaitingView
        {...this.props}
        logoutLoader={logoutLoader}
        refreshLoader={refreshLoader}
        handleLogout={this.handleLogout}
        handleRefreshProfile={this.handleRefreshProfile}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  profile: user.riderProfile,
  user: user.data,
});

const actions = {
  userSignOutRequest,
  getProfileDetailRequest,
};

export default connect(mapStateToProps, actions)(WaitingController);
