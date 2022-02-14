import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  optionItem: {
    ...AppStyles.flexRow,
    marginBottom: Metrics.doubleBaseMargin,
    marginLeft: Metrics.mediumBaseMargin,
  },

  optionIconStyle: {
    height: 21,
    width: 21,
    marginRight: Metrics.baseMargin,
    tintColor: Colors.white,
  },

  optionText: {
    color: Colors.text.primary,
    fontSize: Fonts.size.large,
  },

  radioBtn: {
    borderColor: Colors.button.lang,
    opacity: 0.5,
    borderWidth: 3,
    borderRadius: Metrics.borderRadiusXXLarge,
    height: 25,
    width: 25,
    marginRight: Metrics.mediumBaseMargin,
    top: 3,
  },

  activeRadioBtn: {
    opacity: 0.7,
    borderRadius: Metrics.borderRadiusXXLarge,
    borderColor: Colors.border.peta,
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: Metrics.xsmallMargin,
    backgroundColor: Colors.border.tertiary,
    height: 13,
    width: 13,
  },

  btnWrap: {
    marginLeft: Metrics.mediumBaseMargin,
    marginRight: Metrics.mediumBaseMargin,

    marginTop: Metrics.doubleMediumBaseMargin,
  },
  btnStyle: {
    backgroundColor: Colors.button.octa,
    borderRadius: Metrics.borderRadiusMedium,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.text.secondary,
  },
  gradBtn: {
    borderRadius: Metrics.borderRadius,
  },

  paddingHr: {
    paddingHorizontal: Metrics.doubleMediumBaseMargin,
  },
  submitBtnWrap: {
    marginTop: Metrics.mediumBaseMargin,
  },

  percentSignWrap: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 40,
  },
  percentSignWrapRtl: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 40,
  },
});
