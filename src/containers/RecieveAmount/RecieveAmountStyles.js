import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 5,
  },

  mainContent: {
    backgroundColor: Colors.background.primary,
    marginTop: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.mediumBaseMargin,
  },
  contentWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  collectCashWrap: {
    ...AppStyles.flexRow,
    ...AppStyles.flex2,

    alignItems: 'center',
    marginLeft: Metrics.baseMargin,
  },

  collectCashText: {
    marginLeft: Metrics.baseMargin,
    fontSize: Fonts.size.medium,
  },

  detailsText: {
    color: Colors.text.reca,
    textDecorationLine: 'underline',
  },

  amountInputWrap: {
    ...AppStyles.mTop25,
    marginHorizontal: Metrics.tripleBaseMargin,
    borderBottomColor: Colors.text.quaternary,
    borderBottomWidth: 1,
  },

  inputStyle: {
    ...AppStyles.inputStyle,

    borderBottomWidth: 0,
    marginLeft: Metrics.tripleBaseMargin,
    fontSize: Fonts.size.xxxxxLarge,
  },

  btnSec: {
    flexDirection: 'row',
    marginTop: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  btnWrap: {
    ...AppStyles.flex,
    marginRight: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
  },
  btn1Text: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.secondary,
  },

  btn2Text: {
    fontSize: Fonts.size.xSmall,

    color: Colors.text.primary,
  },

  btn1Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.button.accent,
  },

  btn2Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.button.hexa,
  },

  amountErrorStyle: {
    marginTop: Metrics.smallMargin,
    textAlign: 'center',
    color: Colors.error.primary,
    fontSize: Fonts.size.xxxSmall,
  },

  // shadow
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
});
