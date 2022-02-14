import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from './../../theme';

export default StyleSheet.create({
  optionList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.smallMargin,
    borderRadius: Metrics.borderRadiusMedium,
    marginBottom: Metrics.baseMargin,
    marginHorizontal: 3,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  optionIcon: {
    marginRight: Metrics.mediumBaseMargin,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
  },
  badge: {
    position: 'absolute',
    top: -16,
    left: -15,
    zIndex: 99,
  },

  arrowWrap: {
    width: 32,
    height: 32,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowImg: {
    transform: [{rotate: '180deg'}],
  },

  seeMoreWrap: {
    alignSelf: 'flex-end',
    top: -5,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },

  seeMoreText: {
    textDecorationLine: 'underline',
    color: Colors.text.accent,
    fontSize: Fonts.size.xxSmall,
  },
  seeMoreWrapRtl: {
    alignSelf: 'flex-start',
  },
});
