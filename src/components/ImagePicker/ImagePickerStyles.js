import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSelectorWrapper: {
    borderRadius: 15,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.cheka,
  },
  imageDetails: {
    flex: 1,
    paddingTop: 19,
    paddingBottom: 10,
    paddingLeft: 23,
    paddingRight: 9,
  },

  selectImageText: {
    color: Colors.text.secondary,
    fontWeight: 'bold',
    opacity: 0.9,
    fontSize: 22,
  },
  selectImageTextWrap: {
    alignItems: 'center',
    flex: 1,
  },
  selectImageWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  crossIconStyle: {color: Colors.text.secondary},

  imageSelectorChild: {
    marginTop: 7,
    borderTopColor: Colors.border.secondary,
    borderTopWidth: 0.6,
  },

  submitBtnWrap: {
    marginRight: 15,
    marginLeft: 13,
  },
  submitBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.background.primary,
  },

  submitBtnText: {
    fontSize: 14,
  },

  imagePlaceholderStyle: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },

  imageStyle: {
    width: 120,
    height: 120,
  },

  circularPlusIconStyle: {
    position: 'absolute',
    top: -12,
    bottom: 20,
    right: 90,
    width: 29,
    height: 29,
  },
});
