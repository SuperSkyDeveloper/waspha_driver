import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  bgImage: {
    width: '100%',
  },
  content: {
    marginTop: 100,
    marginBottom: 45,
    paddingHorizontal: 26,
  },
  headingSec: {
    marginTop: 30,
    paddingHorizontal: Metrics.screenWidth / 8,
  },

  backBtnStyle: {
    top: 20,
    left: 0,
    paddingRight: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.mediumBaseMargin,
  },
  mask1: {
    position: 'absolute',
    left: 0,
    bottom: -60,
  },
  drawerImgimgStyle: {
    marginLeft: 20,
    marginTop: 30,
  },
  leftImgViewWrapper: {
    width: 55,
  },
  imageStyle: {
    resizeMode: 'stretch',
    alignSelf: 'flex-end',
  },
});
