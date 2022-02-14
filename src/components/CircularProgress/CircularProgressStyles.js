import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
    opacity: 0.75,
    backgroundColor: Colors.background.primary,
  },

  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: Metrics.screenWidth,
  },
  riderDetailWrap: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    width: '100%',
    backgroundColor: Colors.background.primary,
  },

  riderRatingWrap: {
    flexDirection: 'row',
    height: 28,
    flex: 1,
    justifyContent: 'center',
  },
  starIconStyle: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },

  kmText: {
    color: Colors.text.quaternary,
    textAlign: 'center',
  },
  kmWrap: {
    marginTop: -5,
  },
  assignBtnWrap: {
    alignItems: 'center',
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.xsmallMargin,
    borderWidth: 1,
    borderColor: Colors.border.margin,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: Metrics.xsmallMargin,
  },
  callOutStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  starsImageStyle: {
    height: 17,
    width: 17,
    resizeMode: 'cover',
  },

  currentPin: {height: 27, width: 16},

  currentLocationWrap: {
    flex: 1,
    width: '100%',
    height: 50,
  },
});
