import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  vehicleSecText: {
    fontSize: Fonts.size.normal,
    color: Colors.text.zeka,
  },

  itemImage: {height: 55, width: 55, resizeMode: 'contain'},

  vehicleWrap: {
    height: 130,
    width: 130,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusLarge,
    marginLeft: Metrics.xsmallMargin,
    marginRight: Metrics.smallMargin,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Metrics.baseMargin,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.35,

    elevation: 8,
  },
});
