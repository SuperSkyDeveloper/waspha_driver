import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    width: '100%',
    minHeight: 169,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginContent: {
    paddingHorizontal: 65,
  },

  loginSection: {
    marginTop: 38,
    paddingHorizontal: 50,
  },
  forgetPwd: {
    alignSelf: 'flex-end',
    marginTop: 9,
  },

  loginBtnWrap: {
    marginTop: Metrics.smallMargin,
  },
  signupSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 55,
  },
  loginBtn: {
    height: 50,
  },
  gradBtn: {
    borderRadius: 7,
  },
  showPwsdWrap: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 30,
  },
  showPwsdWrapRtl: {
    left: 0,
  },
  termsSec: {
    alignItems: 'center',
    marginTop: 37,
  },
  memeSec: {
    alignItems: 'center',
    marginTop: -24,
  },
  termWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnWrap: {
    marginTop: Metrics.mediumBaseMargin,
  },
  paddingHr: {paddingHorizontal: Metrics.doubleMediumBaseMargin},

  viewWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: Metrics.borderRadiusMedium,
    height: 53,
    backgroundColor: Colors.button.primary,
    alignItems: 'center',
  },

  uploadDocImage: {
    resizeMode: 'contain',
  },

  havingProblemSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.smallMargin,
  },

  genderWrap: {
    ...AppStyles.flexRow,
    marginLeft: Metrics.doubleMediumBaseMargin,
    marginTop: Metrics.mediumBaseMargin,
  },

  genderIconWrap: {
    ...AppStyles.flexRow,
    marginLeft: Metrics.doubleMediumBaseMargin,
  },

  modalWrap: {
    borderRadius: Metrics.borderRadiusMidLarge,
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
  },
  modal: {
    top: 50,
  },

  helpIconWrap: {
    width: 20,
    height: 20,
    top: 10,
    left: 5,
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.smallMargin,
    paddingVertical: Metrics.baseMargin,
  },
  docImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  documentWrap: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    marginTop: Metrics.doubleBaseMargin,
  },
  documentImg: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginHorizontal: Metrics.xsmallMargin,
    marginBottom: Metrics.smallMargin,
  },

  vehicleValueViewWrap: {
    elevation: 0,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleText: {
    alignSelf: 'center',
  },
  placeholderStyle: {
    color: Colors.text.quaternary,
    fontSize: Fonts.size.xSmall,
  },
  dropDownIconStyle: {
    alignSelf: 'center',
    marginRight: Metrics.smallMargin,
  },
  horizontalLineStyle: {
    backgroundColor: Colors.text.quaternary,
    flex: 1,
    height: 1,
  },

  vehicleDetailsHeading: {
    paddingHorizontal: 48,
    marginBottom: 20,
  },
});
