import {StyleSheet} from 'react-native';
import {AppStyles, Metrics, Fonts, Colors} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  modalStyle: {
    position: 'absolute',

    alignSelf: 'center',

    marginLeft: util.isPlatformAndroid()
      ? Metrics.smallMargin
      : Metrics.mediumBaseMargin,
  },

  contentWrap: {
    zIndex: 999,
  },

  selectLanguageWrap: {
    alignItems: 'center',
    marginBottom: Metrics.doubleBaseMargin,
  },

  amountWrap: {
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.background.reca,
    marginLeft: Metrics.tripleBaseMargin,
    height: 55,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSec: {
    paddingRight: Metrics.tripleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin,
  },
});
