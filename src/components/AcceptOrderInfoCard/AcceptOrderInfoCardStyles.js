import {StyleSheet} from 'react-native';
import {Metrics, Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  infoSec: {
    backgroundColor: Colors.background.primary,

    alignSelf: 'center',
    marginTop: Metrics.doubleMediumBaseMargin,
    borderRadius: Metrics.borderRadiusMedium,
  },

  rowStyling: {...AppStyles.flexRow, justifyContent: 'space-between'},

  firstpartStyle: {marginRight: Metrics.tripleBaseMargin + 4},

  openStyle: {
    maxWidth: Metrics.screenWidth - 15,

    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.smallMargin,
  },

  contentPart: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
  },

  crossIconStyle: {
    position: 'absolute',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    right: -37,
    top: -25,
  },

  crossIconStyleRTL: {
    position: 'absolute',
    left: -31,
    top: -17,
    alignSelf: 'flex-start',
    paddingVertical: Metrics.smallMargin,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.baseMargin,
  },

  downIconStyle: {padding: Metrics.mediumBaseMargin},

  seperatorLine: {
    borderWidth: 0.25,
    opacity: 0.2,
    borderColor: Colors.border.accent,
    marginVertical: Metrics.smallMargin,
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
});
