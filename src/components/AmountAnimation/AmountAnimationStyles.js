import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
export default StyleSheet.create({
  container: {justifyContent: 'flex-start', alignItems: 'center', flex: 1},

  modalWrap: {
    minHeight: Metrics.screenHeight / 2.5,
  },

  modalSec: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusLarge,
    width: '97%',
    marginLeft: Metrics.xsmallMargin,
  },

  contentSec: {
    alignItems: 'center',
    paddingTop: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.baseMargin,
  },

  totalSalesStyle: {
    backgroundColor: Colors.background.tertiary,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusXLarge,
    marginBottom: Metrics.baseMargin,
  },

  contentPart: {
    borderTopWidth: 0.26,
    borderTopColor: Colors.border.accent,
    paddingVertical: Metrics.baseMargin,
    width: '100%',
    alignItems: 'center',
  },

  eyeIconWrap: {
    position: 'absolute',
    top: 32,
  },
  eyeIconStyle: {
    width: 30,
    height: 30,
  },

  //
});
