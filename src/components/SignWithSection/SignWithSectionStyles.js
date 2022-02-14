import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  loginViaSec: {
    marginTop: 22,
    alignItems: 'center',
  },
  loginViaWrap: {
    marginVertical: 11,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginHorizontal: 3,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  iconSize: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  fb: {
    backgroundColor: Colors.social.fb,
  },
  gmail: {
    backgroundColor: Colors.social.gmail,
  },
  linkedin: {
    backgroundColor: Colors.background.tertiary,
  },
  paddingHr: {
    paddingHorizontal: 48,
  },
});
