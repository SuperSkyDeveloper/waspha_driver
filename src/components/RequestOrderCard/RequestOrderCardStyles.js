import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    paddingTop: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.baseMargin,
    paddingLeft: Metrics.smallMargin,
    borderRadius: Metrics.borderRadiusMidLarge,
  },

  customerSec: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: Metrics.smallMargin,
  },
  content: {
    flex: 1,
    marginLeft: Metrics.smallMargin,
  },

  titleStyle: {
    fontSize: Fonts.size.xxxxSmall,
    marginBottom: Metrics.xsmallMargin,
  },

  descStyle: {fontSize: 8, marginBottom: Metrics.xsmallMargin},

  riderRatingWrap: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'flex-start',
  },
  starsImageStyle: {
    width: 15,
    height: 15,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },

  btnWrap: {
    marginRight: Metrics.mediumBaseMargin,
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
  },
  btnStyle: {
    backgroundColor: Colors.button.primary,
    borderRadius: Metrics.borderRadiusMedium,
    paddingVertical: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.mediumBaseMargin,
  },

  btnTextStyle: {
    fontSize: Fonts.size.small,
    color: Colors.text.secondary,
  },

  badgeStyle: {
    backgroundColor: Colors.badge.secondary,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: Metrics.borderRadiusXLarge,
    right: 0,
    padding: Metrics.xsmallMargin,
  },

  imageSize: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
    borderRadius: Metrics.borderRadius,
    overflow: 'hidden',
  },
});
