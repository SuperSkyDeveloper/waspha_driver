import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  hLine: {
    marginHorizontal: Metrics.smallMargin,
    borderBottomColor: Colors.border.hepta,
    borderBottomWidth: 0.5,
  },
  iconStyle: {
    transform: [{rotate: '-180deg'}],
  },
  questionText: {
    marginLeft: Metrics.smallMargin,
    maxWidth: Metrics.screenWidth - 70,
  },
  descText: {
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.smallMargin,
    paddingVertical: Metrics.mediumBaseMargin,
  },
  icon: {
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.mediumBaseMargin,
  },
  spacing: {
    paddingVertical: Metrics.mediumBaseMargin,
    marginLeft: Metrics.smallMargin,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  idTextStyle: {
    marginLeft: Metrics.xsmallMargin,
  },
});
