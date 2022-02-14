import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.mediumBaseMargin,
  },

  inputIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.text.primary,
  },

  inputWrap: {
    ...AppStyles.mTop20,
    justifyContent: 'space-between',
    borderBottomColor: Colors.text.quaternary,
    borderBottomWidth: 0.26,
    flexDirection: 'row',
    alignItems: 'center',
  },

  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignCenterRtl: {
    flexDirection: 'row-reverse',
  },
  inputStyle: {
    ...AppStyles.inputStyle,
    borderBottomWidth: 0,
    marginLeft: Metrics.baseMargin,
  },

  nonInputField: {
    borderBottomColor: Colors.text.quaternary,
    borderBottomWidth: 0.36,
    paddingVertical: Metrics.baseMargin + 4,
  },

  nonInputText: {
    marginLeft: Metrics.mediumBaseMargin,
    fontSize: Fonts.size.xxSmall,
  },

  androidSize: {
    transform: [{scaleX: 0.9}, {scaleY: 0.8}],
  },
  iosSize: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
  },
  selectLanguageText: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    top: 14,
  },

  verifiedText: {
    color: Colors.text.zeka,
    fontSize: Fonts.size.xxSmall,
  },

  blueCircle: {
    width: 14,
    height: 14,
    backgroundColor: 'blue',
    borderRadius: Metrics.borderRadiusLarge,
  },
});
