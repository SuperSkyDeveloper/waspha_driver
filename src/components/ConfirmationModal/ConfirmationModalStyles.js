import {StyleSheet} from 'react-native';
import {AppStyles, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  amountWrap: {
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.background.reca,
    marginLeft: Metrics.tripleBaseMargin,

    paddingVertical: Metrics.xsmallMargin + 2,
    alignItems: 'center',
    minWidth: 200,
  },

  modalStyle: {borderRadius: Metrics.borderRadiusMedium},

  contentSec: {
    paddingRight: Metrics.tripleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.doubleBaseMargin,
  },

  btnSec: {
    flexDirection: 'row',
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
  },
  btnWrap: {
    ...AppStyles.flex,
    marginRight: Metrics.xsmallMargin,
    marginLeft: Metrics.xsmallMargin,
  },
  btn1Text: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.secondary,
  },

  btn2Text: {
    fontSize: Fonts.size.xxSmall,

    color: Colors.text.primary,
  },

  btn1Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.button.deca,
  },

  btn2Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.button.hexa,
  },
});
