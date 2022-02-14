import {Colors, Metrics, AppStyles} from '../../theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  mapWrap: {flex: 2},

  totalAmountWrap: {
    position: 'absolute',
    top: 50,

    flex: 1,
    alignSelf: 'center',
  },

  goWrap: {position: 'absolute', bottom: 50, alignSelf: 'center'},

  totalAmountStyle: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusLarge,
  },

  goBtnWrap: {
    height: 75,
    width: 75,
    padding: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusXXLarge,
    alignSelf: 'center',
    marginBottom: Metrics.tripleBaseMargin,
  },

  goContent: {
    top: -27,
    left: -26,
    borderRadius: Metrics.borderRadiusXXLarge,
    borderWidth: 2,
    borderColor: Colors.border.secondary,
    height: 65,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  goTxt: {textAlign: 'center'},

  bottomSec: {
    paddingVertical: Metrics.mediumBaseMargin,
    borderTopLeftRadius: Metrics.borderRadiusXLarge,
    borderTopRightRadius: Metrics.borderRadiusXLarge,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContent: {...AppStyles.flexRow, justifyContent: 'space-around'},
});
