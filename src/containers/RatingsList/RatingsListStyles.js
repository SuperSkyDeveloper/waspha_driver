import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  ratingWrap: {
    alignSelf: 'flex-end',
    marginRight: Metrics.baseMargin,
    top: 30,
    backgroundColor: Colors.badge.tertiary,
    borderRadius: Metrics.borderRadiusMedium,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.xsmallMargin,
    flexDirection: 'row',
  },
  ratingWrapRtl: {
    alignSelf: 'flex-start',
  },

  starIconStyle: {width: 13, height: 13, marginRight: Metrics.xsmallMargin},
  noReviewsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.screenHeight / 3,
  },

  reviewerImg: {
    borderRadius: 100,
    width: 46,
    height: 46,
    marginRight: Metrics.baseMargin,
  },
});
