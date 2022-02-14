import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  headImageStyle: {
    flex: 1,
    width: '100%',
  },

  contentSec: {
    paddingHorizontal: Metrics.baseMargin,
  },
  btnWrap: {
    marginTop: Metrics.mediumBaseMargin,
    marginRight: Metrics.doubleMediumBaseMargin,
    marginLeft: Metrics.doubleMediumBaseMargin,
  },
  btnStyle: {
    backgroundColor: Colors.button.deca,
    height: 55,
    borderRadius: Metrics.borderRadius,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },

  shadowStyle: {
    shadowColor: Colors.button.accent,

    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  requestOrderCard: {
    marginTop: Metrics.doubleMediumBaseMargin,
    marginBottom: Metrics.mediumBaseMargin,
  },

  remainingTimeStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.hexa,
    marginTop: Metrics.smallMargin,
  },

  circularMapStyle: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    borderRadius: 150,
    height: 260,
    width: 260,
    overflow: 'hidden',
    zIndex: 999,
  },

  declineTxt: {marginTop: Metrics.baseMargin},

  smallImageStyle: {
    width: 39,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border.veca,
    borderRadius: Metrics.borderRadiusXLargeMedium,
    overflow: 'hidden',
  },
  driverImg: {
    width: 38,
    height: 38,
  },
});
