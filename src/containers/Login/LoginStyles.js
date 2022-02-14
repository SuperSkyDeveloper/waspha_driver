import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import {MESSAGE_TYPES} from '../../constants';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    paddingHorizontal: Metrics.mediumBaseMargin,
    width: Metrics.screenWidth,
    minHeight: 375,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginContent: {
    marginHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.tripleBaseMargin,
    flex: 1,
  },
  loginViaSec: {
    marginTop: Metrics.mediumBaseMargin,
    alignItems: 'center',
  },
  loginViaWrap: {
    marginVertical: Metrics.smallMargin,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.xsmallMargin,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  fb: {
    backgroundColor: Colors.chambray,
  },
  gmail: {
    backgroundColor: Colors.punch,
  },
  linkedin: {
    backgroundColor: Colors.denim,
  },
  loginSection: {
    marginTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.tripleBaseMargin,
  },
  forgetPwd: {
    flexDirection: 'row',
  },
  paddingHr: {
    paddingHorizontal: Metrics.tripleBaseMargin,
  },
  loginBtnWrap: {
    marginTop: Metrics.mediumBaseMargin,
  },
  signupSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleMediumBaseMargin,
    marginRight:Metrics.doubleBaseMargin
  },
  loginBtn: {
    height: 50,
  },
  mask3: {
    position: 'absolute',
    top: -50,
    left: 0,
  },
  mask1: {
    position: 'absolute',
    bottom: -30,
    right: 0,
  },
  mask2: {
    position: 'absolute',
    bottom: -40,
    left: 20,
  },
  showPwsdWrap: {
    position: 'absolute',
    right: 0,
    top: util.isPlatformAndroid() ? 26 : 16,
    width: 30,
  },
  showPwsdWrapRtl: {
    left: 0,
  },
  gradBtn: {
    borderRadius: Metrics.borderRadius,
  },
  forgetWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.smallMargin,
  },
  radioBtn: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: Metrics.borderRadiusXLarge,
    marginRight: Metrics.xsmallMargin,
  },
});
