import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentSec: {
    flex: 1,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
  },

  questionStyleWrap: {
    paddingTop: Metrics.doubleBaseMargin,
  },
  mainContent: {
    paddingTop: Metrics.doubleBaseMargin,
  },
  radioBtn: {
    marginRight: Metrics.baseMargin,

    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox: {
    height: 23,
    width: 23,
  },

  itemParent: {
    paddingRight: Metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtnActive: {
    height: 11,
    width: 11,
    borderRadius: Metrics.borderRadius,
  },

  itemWrap: {
    ...AppStyles.mBottom30,
  },

  labelStyle: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.label.secondary,
    fontWeight: '500',
    marginBottom: Metrics.baseMargin,
  },

  questionStyle: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    color: '#535353',
  },

  addressInputWrap: {
    paddingTop: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,

    minHeight: 150,
    textAlignVertical: 'top',
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  contentTextStyle: {
    fontSize: Fonts.size.xxSmall,
    color: '#535353',
  },
  inputStyle: {
    backgroundColor: 'red',
    fontSize: Fonts.size.xxxSmall,
    textAlignVertical: 'top',

    opacity: 0.77,
  },

  contentTextWrap: {
    paddingTop: 5,
  },

  inputWrap: {
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingTop: Metrics.doubleBaseMargin,
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
