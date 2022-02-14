import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 5,
  },

  shadowStyle2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 0.7,
  },

  showNoOfItemsWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    paddingVertical: Metrics.baseMargin,
    justifyContent: 'center',
    marginTop: Metrics.tripleBaseMargin,
    marginHorizontal: Metrics.mediumBaseMargin,
    marginBottom: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
  },
  bagIcon: {width: 35, height: 28},

  contentSec: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    borderTopStartRadius: Metrics.borderRadiusMedium,
    borderTopEndRadius: Metrics.borderRadiusMedium,
    borderColor: Colors.border.primary,
    marginHorizontal: Metrics.mediumBaseMargin,
  },

  tableHeadWrap: {
    marginHorizontal: Metrics.mediumBaseMargin,
    paddingTop: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.baseMargin,
  },

  tableHeadText: {
    color: Colors.text.primary,
    fontSize: Fonts.size.normal,
  },

  borderLine: {
    paddingLeft: Metrics.tripleBaseMargin,
    borderLeftColor: Colors.border.primary,
    borderLeftWidth: 0.4,
  },
  borderLineRtl: {
    paddingLeft: Metrics.tripleBaseMargin,
    paddingRight: Metrics.tripleBaseMargin,
    borderRightColor: Colors.border.primary,
    borderRightWidth: 0.4,
  },

  itemsContent: {
    borderBottomEndRadius: Metrics.borderRadiusMedium,
    borderBottomStartRadius: Metrics.borderRadiusMedium,
    paddingTop: Metrics.baseMargin,
    marginTop: 0,
    marginHorizontal: Metrics.mediumBaseMargin,
  },

  itemsSec: {
    ...AppStyles.flexRow,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.baseMargin,
  },

  itemText: {
    color: Colors.text.primary,
    fontSize: Fonts.size.small,
    opacity: 0.6,
  },

  qtyWrap: {
    marginRight: Metrics.doubleMediumBaseMargin,
  },
});
