import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import styles from './WaitingStyles';
import {strings} from '../../constants';
import {SignHeader, Text, Button, CustomNavbar, Loader} from '../../components';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function WaitingView(props) {
  const {
    handleLogout,
    logoutLoader,
    refreshLoader,
    handleRefreshProfile,
    profile,
  } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <SignHeader
          showMask={false}
          drawerImg={Images.BaselineIcon}
          leftBtnPress={() => {
            Actions.drawerOpen();
          }}
          subTitle={`${strings.WAITING}......`}
        />
        <View style={styles.memeSec}>
          <RnImage source={Images.Waiting} />
        </View>
        <Text
          style={styles.textStyle}
          textAlign={'center'}
          size={Fonts.size.xxxSmall}
          color={Colors.text.quaternary}>
          {strings.WAITING_FOR_YOUR_ACCOUNT_TO_BE_VERIFIED}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Actions.profile();
          }}>
          <Text
            textAlign={'center'}
            size={Fonts.size.xSmall}
            color={Colors.text.accent}>
            {strings.VISIT_PROFILE}
          </Text>
        </TouchableOpacity>
      </View>

      {!_.isEmpty(profile) &&
        !_.isNil(profile.message) &&
        !_.isEmpty(profile.message) && (
          <View style={styles.msgBox}>
            <Text
              size={Fonts.size.xSmall}
              type="bold"
              color={Colors.text.primary}
              style={{textAlign: util.isRTL() ? 'right' : 'left'}}>
              {strings.NOTES_FROM_ADMIN}:
            </Text>
            <Text
              style={AppStyles.mTop5}
              size={Fonts.size.xSmall}
              color={Colors.text.primary}
              style={{textAlign: util.isRTL() ? 'right' : 'left'}}>
              {/* {util.isEmpty(storeProfile.message) && storeProfile.message} */}
              {profile.message}
            </Text>
          </View>
        )}

      <TouchableOpacity
        onPress={handleRefreshProfile}
        style={styles.reloadImgWrap}>
        {/* { && <ActivityIndicator />} */}
        {refreshLoader && <Loader loading={refreshLoader} />}
        {!refreshLoader && (
          <RnImage style={styles.reloadImg} source={Images.ReloadImg} />
        )}
      </TouchableOpacity>

      <View style={[styles.logoutBtnWrap, styles.paddingHr]}>
        <LinearGradient
          start={{x: 0.3, y: 2}}
          end={{x: 1, y: 0}}
          colors={Colors.gradient.primary}
          style={styles.gradBtn}>
          <Button
            color={Colors.button.hexa}
            background={Colors.transparent}
            style={styles.loginBtn}
            size={Fonts.size.normal}
            onPress={handleLogout}
            isLoading={logoutLoader}
            indicatorColor={Colors.button.hexa}
            disabled={logoutLoader}
            type="semiBold">
            {strings.LOGOUT.toUpperCase()}
          </Button>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
