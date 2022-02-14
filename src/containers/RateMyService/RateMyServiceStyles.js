import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  contentSec: {
    marginTop: Metrics.mediumBaseMargin,
    alignItems: 'center',
  },

  inputWrap: {
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    marginTop: Metrics.mediumBaseMargin,
    backgroundColor: Colors.background.primary,
  },

  inputStyle: {
    fontSize: Fonts.size.xxxSmall,
    textAlignVertical: 'top',
    opacity: 0.77,
  },

  addressInputWrap: {
    paddingTop: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,

    minHeight: 150,
    textAlignVertical: 'top',
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  submitBtnWrap: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
  },

  submitBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.primary,
  },

  submitBtnText: {
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
  },
  providerRatingWrap: {
    justifyContent: 'flex-start',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,

    top: -5,
  },
  richInputStyle: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,

    marginTop: 10,

    color: Colors.shark,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 0,
    elevation: 5,
  },
});
