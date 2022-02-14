import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  submitBtnWrap: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingRight: Metrics.tripleBaseMargin,
    paddingLeft: Metrics.tripleBaseMargin,
  },

  submitBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.primary,
  },

  submitBtnText: {
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
  },
});
