import {StyleSheet} from 'react-native';
import {Metrics, Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  espWrap: {alignItems: 'center', marginTop: Metrics.baseMargin},

  dayListDetailsWrap: {
    ...AppStyles.marginHorizontalBase,
    ...AppStyles.mTop20,
    minWidth: '97%',
    flex: 1,
  },
});
