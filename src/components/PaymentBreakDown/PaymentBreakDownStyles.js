import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    marginHorizontal: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusMedium,
  },

  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 10,
  },

  socialIconWrap: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    marginVertical: Metrics.mediumBaseMargin,
  },
  imageSelectorWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  priceWrap: {
    marginRight: Metrics.doubleBaseMargin,
    flex: 1,
  },

  linearWrap: {
    ...AppStyles.flex,

    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusMedium,
  },

  headWrap: {marginBottom: Metrics.mediumBaseMargin, alignItems: 'center'},
  headText: {
    fontSize: Fonts.size.large,
    color: Colors.text.secondary,
  },
  contentSec: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    marginBottom: Metrics.baseMargin,
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: Metrics.smallMargin,
  },
  circleStyle: {
    borderRadius: Metrics.borderRadiusXLargeMedium,
    width: 15,
    height: 15,
    marginRight: Metrics.smallMargin,
    marginTop: 3,
    backgroundColor: Colors.background.tertiary,
  },

  textStyle: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.primary,
  },

  dashOneStyle: {
    opacity: 0.8,
    marginLeft: Metrics.mediumBaseMargin,
    marginBottom: Metrics.mediumBaseMargin,
    borderTopWidth: 0.8,
    borderTopColor: Colors.border.quaternary,
  },
  dashTwoStyle: {
    opacity: 0.8,
    marginLeft: Metrics.mediumBaseMargin,
    marginRight: Metrics.doubleBaseMargin,
    marginBottom: Metrics.mediumBaseMargin,
    borderTopWidth: 0.8,
    borderTopColor: Colors.border.quaternary,
  },

  toBePaidWrap: {
    marginLeft: Metrics.mediumBaseMargin,
  },

  totalAmountWrap: {
    marginRight: Metrics.doubleBaseMargin,
  },
});
