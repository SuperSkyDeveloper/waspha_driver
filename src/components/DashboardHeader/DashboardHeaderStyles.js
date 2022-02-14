import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  header: {
    minHeight: 205,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.mediumBaseMargin,
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerItem: {
    alignItems: 'center',
  },

  backBtnStyle: {
    top: -20,
    left: 12,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    marginTop: 60,
    width: 32,
    height: 32,
  },
  backBtnStyleRtl: {
    alignSelf: 'flex-end',
    marginRight: Metrics.baseMargin,
    top: -40,
    padding: 40,
  },

  error: {
    position: 'absolute',
    right: 0,
    top: -10,
    zIndex: 999,
  },
  amountWrap: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: 2,
    borderRadius: 3,
    position: 'absolute',
    bottom: 23,
    flex: 1,
    flexDirection: 'row',
  },
  dashboardWrap: {
    marginTop: -32,
  },
  square: {
    width: 6,
    height: 8,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    alignItems: 'center',
    marginRight: Metrics.xsmallMargin,
    marginTop: 6,
    justifyContent: 'flex-end',
  },
  backBtnRtl: {
    transform: [{rotate: '180deg'}],
  },
});
