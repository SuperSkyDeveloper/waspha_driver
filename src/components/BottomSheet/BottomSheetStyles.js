import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: Metrics.borderRadiusXLarge,
    borderTopRightRadius: Metrics.borderRadiusXLarge,
    paddingHorizontal: Metrics.baseMargin,
  },

  iconText: {
    fontSize: Fonts.size.small,
  },
  iconSize: {width: 60, height: 60},
  iconsWrap: {
    ...AppStyles.flexRow,
    justifyContent: 'space-around',
    marginTop: Metrics.smallMargin,
  },
});
