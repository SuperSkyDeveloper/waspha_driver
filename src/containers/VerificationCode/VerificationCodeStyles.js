import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtnWrap: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    // todo ahsan
    marginTop: 90,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  gradBtn: {
    borderRadius: Metrics.borderRadius,
  },
  loginBtn: {
    height: 50,
  },
  mask2: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  wrap: {
    marginTop: Metrics.tripleBaseMargin,
    paddingHorizontal: Metrics.tripleBaseMargin,
  },
  resendWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  size: {
    width: 32,
    height: 32,
  },
  modalWrap: {
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadius,
  },
});
