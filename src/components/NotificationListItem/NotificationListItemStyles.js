import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  list: {
    flexDirection: 'row',
    paddingVertical: Metrics.mediumBaseMargin,
    borderBottomColor: Colors.border.margin,
    borderBottomWidth: 1,
    marginHorizontal: Metrics.mediumBaseMargin,
    justifyContent: 'space-between',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgWrap: {
    width: 65,
    height: 65,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  touchSize: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    position: 'absolute',
    right: 0,
    top: 40,
  },
  status: {
    width: 10,
    height: 10,
    backgroundColor: Colors.label.primary,
    borderRadius: Metrics.borderRadiusXLarge,

    marginRight: Metrics.xsmallMargin,
  },
  touchArea: {
    width: 35,
    height: 22,
    paddingRight: Metrics.xsmallMargin,
    alignItems: 'flex-end',
  },
});
