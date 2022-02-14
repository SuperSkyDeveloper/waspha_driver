import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.primary,
    borderTopWidth: 0.8,
    borderTopColor: Colors.border.margin,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.border.margin,
  },

  boxWrap: {
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin,
    width: '33%',
  },

  borderRightStyle: {
    borderRightColor: Colors.border.margin,
    borderRightWidth: 0.8,
  },

  headingText: {
    color: Colors.text.hexa,
    fontSize: Fonts.size.small,
    marginTop: Metrics.xsmallMargin,
  },

  valueText: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
  },
});
