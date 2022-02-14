import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import {Text, RoundErrorItem} from '../../components';
import styles from './DashboardHeaderStyles';
import {Colors, Images, Fonts, AppStyles, Metrics} from './../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function DashboardHeaderView(props) {
  const {user} = props;
  return (
    <LinearGradient
      start={{x: 0.2, y: 0.8}}
      end={{x: 0.9, y: -0.9}}
      colors={Colors.gradient.primary}
      style={styles.header}>
      <TouchableOpacity
        style={[styles.backBtnStyle, util.isRTL() && styles.backBtnStyleRtl]}
        onPress={() => Actions.pop()}>
        <RnImage
          source={Images.BackBtn}
          style={util.isRTL() && styles.backBtnRtl}
        />
      </TouchableOpacity>
      <View style={[styles.headerWrap, util.isRTL() && AppStyles.rowReverse]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerItem}
          onPress={() => {
            Actions.pop();
            Actions.earningDetails();
          }}>
          <RnImage source={Images.EarningIcon} />
          <Text
            color={Colors.text.secondary}
            size={Fonts.size.small}
            type="medium"
            style={AppStyles.mTop15}>
            {/* {strings.EARNINGS} */}
            {strings.TRIP_DETAILS}
          </Text>
        </TouchableOpacity>
        <View style={styles.dashboardWrap}>
          <TouchableOpacity
            style={styles.headerItem}
            activeOpacity={0.7}
            onPress={() => {
              Actions.profile();
            }}>
            <RnImage
              source={
                _.isNil(user.avatar)
                  ? Images.ProfilePlaceholder
                  : {uri: user.avatar}
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 100,
                tintColor: _.isNil(user.avatar) ? Colors.white : '',
              }}
            />
            <View style={styles.amountWrap}>
              {/* <View style={styles.square}></View> */}
              <Text size={Fonts.size.xxSmall}>
                {_.isNil(user.avg_rating) ? 0 : user.avg_rating.toFixed(2)}
              </Text>
            </View>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.small}
              type="medium"
              style={AppStyles.mTop10}>
              {user.name}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.headerItem}
          activeOpacity={0.7}
          onPress={() => {
            Actions.pop();
            Actions.notification();
          }}>
          <View>
            {/* <View style={styles.error}>
              <RoundErrorItem notificationCounter={1} />
            </View> */}
            <RnImage source={Images.BellIcon} style={{width: 44, height: 44}} />
          </View>
          <Text
            color={Colors.text.secondary}
            size={Fonts.size.small}
            type="medium"
            style={{marginTop: 19}}>
            {strings.NOTIFICATION}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
