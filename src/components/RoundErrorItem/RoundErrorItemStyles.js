import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  badge: {
    width: 28,
    height: 28,
    borderRadius: Metrics.borderRadiusXLarge,
    backgroundColor: Colors.error.primary,
    borderRadius: Metrics.borderRadiusXLarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
