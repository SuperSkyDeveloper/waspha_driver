import {StyleSheet} from 'react-native';
import {Metrics, Colors, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  mainSec: {
    borderTopRightRadius: Metrics.borderRadiusLarge,
    borderTopLeftRadius: Metrics.borderRadiusLarge,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },

  contentSec: {
    ...AppStyles.flexRow,
    paddingRight: Metrics.tripleBaseMargin,

    paddingTop: Metrics.xsmallMargin,
  },

  mapNavIconStyle: {
    position: 'absolute',
    top: -25,
    right: 25,
    zIndex: 999,
  },
  mapNavIconStyleRtl: {
    left: 25,
  },

  addressLandmarkSec: {
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
  },
  vendorShopIconWrap: {
    opacity: 0.4,
    height: 68,
    width: 68,
    borderRadius: Metrics.borderRadiusMedium,
    marginTop: Metrics.doubleBaseMargin,
  },
  bgColor: {backgroundColor: Colors.background.primary},
  customerIcon: {
    height: 69,
    width: 69,

    position: 'absolute',
    top: 36,

    borderRadius: 50,
    overflow: 'hidden',
  },

  vendorShopIcon: {
    position: 'absolute',
    left: 9,
    top: 42,
    height: 53,
    width: 53,
  },

  btnWrap: {
    marginRight: Metrics.mediumBaseMargin,
    marginTop: Metrics.baseMargin,
  },
  btnStyle: {
    backgroundColor: Colors.button.octa,
    borderRadius: Metrics.borderRadiusMedium,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
  },

  userContactWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    ...AppStyles.mTop10,
    marginBottom: Metrics.doubleBaseMargin,
  },
  contactImage: {
    height: 35,
    width: 60,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.contactOptionsColor.enable,
  },
  disableContactImage: {
    height: 35,
    width: 60,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.contactOptionsColor.disable,
  },

  image: {
    ...AppStyles.mTop5,
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 25,
    width: 30,
  },
});
