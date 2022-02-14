import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  modalStyle: {
    borderRadius: Metrics.borderRadiusMidLarge,
    paddingVertical: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.smallMargin,
  },

  contentTextStyle: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.xSmall,
    marginTop: 2,
  },

  upperContent: {
    ...AppStyles.flexRow,
    paddingLeft: Metrics.tripleMediumBaseMargin + 6,
  },

  askCodeTextWrap: {
    paddingTop: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
  },

  btnWrap: {
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.xsmallMargin,

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

  wrapper: {
    alignItems: 'center',
  },
});
