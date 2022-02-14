import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  parentWrap: {
    maxWidth: Metrics.screenWidth,
    flex: 1,
  },

  timeAndOrderCodeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
  },

  locationSec: {
    marginBottom: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusMidLarge,
    flexDirection: 'row',
  },

  changeCardColorStyle: {
    backgroundColor: Colors.background.primary,
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.xsmallMargin,
    zIndex: 999,
  },

  dotStyle: {
    borderRadius: Metrics.borderRadiusXXLarge,
    backgroundColor: Colors.border.teka,
    opacity: 0.9,
    height: 10,
    width: 10,
    marginLeft: Metrics.baseMargin,
  },
  dashWrap: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.background.teka,
  },

  dashStyle: {
    width: 1,
    height: 43,
    flex: 1,
    flexDirection: 'column',
    opacity: 0.4,
  },

  spacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  borderStyling: {
    paddingTop: Metrics.smallMargin,
    minWidth: '80%',
  },

  toggleIconWrap: {
    paddingVertical: Metrics.xsmallMargin,
  },

  arrowImg: {
    transform: [{rotate: '180deg'}],
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
