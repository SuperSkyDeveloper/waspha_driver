import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

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

  contentWrap: {
    backgroundColor: Colors.background.primary,
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.mediumBaseMargin,
  },

  collectCashText: {
    marginLeft: Metrics.baseMargin,
    fontSize: Fonts.size.medium,
  },

  innerBtnWrap: {
    paddingBottom: Metrics.baseMargin,

    paddingRight: Metrics.doubleMediumBaseMargin,
    paddingLeft: Metrics.doubleMediumBaseMargin,
  },

  innerBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
  },

  submitBtnWrap: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingRight: Metrics.doubleMediumBaseMargin,
    paddingLeft: Metrics.doubleMediumBaseMargin,
  },

  submitBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.primary,
  },

  submitBtnText: {
    fontSize: Fonts.size.small,
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
