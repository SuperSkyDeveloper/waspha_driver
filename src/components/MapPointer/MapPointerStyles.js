import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  smallPin: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  bigPin: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  currentLocationWrap: {
    resizeMode: 'contain',
  },

  riderImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
