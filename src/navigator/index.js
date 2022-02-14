// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Alert, BackHandler} from 'react-native';

import {Stack, Scene, Router, Actions, Drawer} from 'react-native-router-flux';

import styles from './styles';
import {Colors} from '../theme';

import {
  Login,
  Welcome,
  Signup,
  VerificationCode,
  ForgetPassword,
  PasswordRecovery,
  Waiting,
  OnlineOffline,
  RequestOrder,
  CancelOrder,
  AcceptOrder,
  ContactUs,
  ConfirmScreen,
  ResetPassword,
  FAQS,
  DeliveryPayment,
  RecieveAmount,
  RecieveAmountDetails,
  OrderHistoryDetails,
  RatingsList,
  RateMyService,
  Profile,
  EarningDetails,
  VendorDashboard,
  Notification,
  CookiePolicy,
  CopyrightPolicy,
  TermsAndCondition,
  GDPRComplianceStatement,
  SelectLocationMap,
  SearchLocation,
  Start,
  NoConnection,
  PrivacyPolicy,
  RCListing,
  RocketChatContainer,
  ZoneOptions,
  ReferralCode,
  ChangeEmailAndNumber,
} from '../containers';
import {SideBar} from '../components';

function onBackPress() {
  // if (Actions.currentScene == 'verificationCode') {
  //   Alert.alert('Hold on!', 'Are you sure you want to navigate back?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'YES',
  //       onPress: () => {
  //         Actions.pop();
  //       },
  //     },
  //   ]);
  //   return true;
  // }

  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Drawer
      drawer
      key="drawerMenu"
      contentComponent={SideBar}
      drawerWidth={312}
      side={'left'}
      hideNavBar>
      <Scene key="onlineOffline" component={OnlineOffline} hideNavBar />
      <Scene key="waiting" component={Waiting} hideNavBar />
    </Drawer>

    <Scene key="start" component={Start} hideNavBar initial />

    <Scene key="welcome" component={Welcome} hideNavBar />
    <Scene key="faqs" component={FAQS} hideNavBar />
    <Scene
      key="recieveAmountDetails"
      component={RecieveAmountDetails}
      hideNavBar
    />
    <Scene
      key="orderHistoryDetails"
      component={OrderHistoryDetails}
      hideNavBar
    />

    <Scene key="noConnection" component={NoConnection} hideNavBar />
    <Scene key="rclisting" component={RCListing} hideNavBar />
    <Scene
      key="rocketChatContainer"
      component={RocketChatContainer}
      hideNavBar
    />
    <Scene
      key="changeEmailAndNumber"
      component={ChangeEmailAndNumber}
      hideNavBar
    />
    <Scene key="searchLocation" component={SearchLocation} hideNavBar />
    <Scene key="zoneOptions" component={ZoneOptions} hideNavBar />
    <Scene key="selectLocationMap" component={SelectLocationMap} hideNavBar />
    <Scene key="profile" component={Profile} hideNavBar />
    <Scene key="ratingsList" component={RatingsList} hideNavBar />
    <Scene key="rateMyService" component={RateMyService} hideNavBar />
    <Scene key="earningDetails" component={EarningDetails} hideNavBar />
    <Scene key="vendorDashboard" component={VendorDashboard} hideNavBar />
    <Scene key="notification" component={Notification} hideNavBar />
    <Scene key="deliveryPayment" component={DeliveryPayment} hideNavBar />
    <Scene key="recieveAmount" component={RecieveAmount} hideNavBar />
    <Scene key="resetPassword" component={ResetPassword} hideNavBar />
    <Scene key="verificationCode" component={VerificationCode} hideNavBar />
    <Scene key="confirmScreen" component={ConfirmScreen} hideNavBar />
    <Scene key="acceptOrder" component={AcceptOrder} hideNavBar />
    <Scene key="forgetPassword" component={ForgetPassword} hideNavBar />
    <Scene key="signup" component={Signup} hideNavBar />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="contactUs" component={ContactUs} hideNavBar />
    <Scene key="passwordRecovery" component={PasswordRecovery} hideNavBar />
    <Scene key="requestOrder" component={RequestOrder} hideNavBar />
    <Scene key="cancelOrder" component={CancelOrder} hideNavBar />
    <Scene key="cookiePolicy" component={CookiePolicy} hideNavBar />
    <Scene key="copyrightPolicy" component={CopyrightPolicy} hideNavBar />
    <Scene key="termsAndCondition" component={TermsAndCondition} hideNavBar />
    <Scene key="privacyPolicy" component={PrivacyPolicy} hideNavBar />
    <Scene key="referralCode" component={ReferralCode} hideNavBar />
    <Scene
      key="gdprComplianceStatement"
      component={GDPRComplianceStatement}
      hideNavBar
    />
  </Stack>,
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);
