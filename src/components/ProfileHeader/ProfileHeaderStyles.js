import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  mainSec: {
    paddingTop: Metrics.doubleMediumBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    borderBottomLeftRadius: Metrics.borderRadiusLarge,
    borderBottomRightRadius: Metrics.borderRadiusLarge,
  },

  cameraIconWrap: {
    position: 'absolute',
    bottom: -4,
    right: -10,
    backgroundColor: Colors.background.primary,
    padding: 10,
    zIndex: 999,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconWrapRtl: {
    left: -10,
  },
  headerText: {
    color: Colors.text.secondary,
  },
  profilePicWrap: {
    alignItems: 'flex-start',
    marginLeft: Metrics.mediumBaseMargin,
  },
  profilePic: {height: 85, width: 85, borderRadius: 40, overflow: 'hidden'},

  providerRatingWrap: {
    justifyContent: 'center',
    flex: 1,
    marginRight: Metrics.tripleBaseMargin,
  },

  userRatingWrap: {
    justifyContent: 'center',
    flex: 1,
    marginRight: Metrics.doubleBaseMargin,
  },

  starIcon: {height: 25, width: 25},
  userTextStyle: {
    color: Colors.text.secondary,
  },
  imageRtl: {
    top: -25,
    transform: [{rotate: '180deg'}],
  },
  backWrap: {},
});
