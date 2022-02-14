import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  mainSec: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },

  headerText: {
    color: Colors.text.secondary,
  },

  profilePic: {height: 120, width: 120, borderRadius: 100},

  providerRatingWrap: {
    justifyContent: 'center',
    flex: 1,
    marginRight: Metrics.doubleBaseMargin,
    top: -5,
  },

  userRatingWrap: {
    justifyContent: 'center',
    flex: 1,
    // marginRight: Metrics.smallMargin,
    top: -3,
  },

  starIcon: {height: 25, width: 25},
});
