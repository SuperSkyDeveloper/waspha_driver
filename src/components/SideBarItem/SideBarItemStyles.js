import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  linkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },
  icon: {
    marginRight: 10,
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: Colors.text.secondary,
  },

  iconMain: {
    top: -3,
  },

  switchWrap: {
    flex: 1,
    top: 1,
    right: -3,
    alignSelf: 'flex-end',
  },

  iosSize: {
    marginHorizontal: Metrics.smallMargin,
  },

  badge: {
    backgroundColor: Colors.red,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white,
    marginLeft: 10,
  },

  activeBtn: {
    transform: [{rotate: '180deg'}],
  },
});
