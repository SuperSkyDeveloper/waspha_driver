import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {},
  containerStyle: {
    backgroundColor: Colors.transparent,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text.quaternary,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  textContainerStyle: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: Metrics.smallMargin,
  },
  flagButtonStyle: {width: 60},
  textInputProps: {
    height: 40,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.xxSmall,
  },
  codeTextStyle: {
    fontSize: Fonts.size.xxSmall,
  },
});
