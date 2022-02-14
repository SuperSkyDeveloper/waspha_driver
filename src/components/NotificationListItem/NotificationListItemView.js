import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {HTMLView, Text} from '../../components';
import styles from './NotificationListItemStyles';
import {Colors, Images, Fonts, AppStyles} from './../../theme';
import {navigateOnNotificationTap} from '../../helpers/firebaseHelper';
import util from '../../util';

export default function NotificationListItemView(props) {
  const {item} = props;
  const {extra_data} = item;
  let extraData = JSON.parse(extra_data);

  return (
    <TouchableOpacity
      style={[styles.list, util.isRTL() && AppStyles.rowReverse]}
      activeOpacity={0.7}
      onPress={() => navigateOnNotificationTap(item, true)}>
      <View style={[styles.spaceBetween, util.isRTL() && AppStyles.rowReverse]}>
        <View style={[styles.imgWrap, util.isRTL() && AppStyles.mLeft10]}>
          <RnImage
            style={[styles.img, {borderRadius: 100}]}
            source={
              _.isNil(extraData.sent_by) || _.isNil(extraData.sent_by.avatar)
                ? Images.ProfilePlaceholder
                : {uri: extraData.sent_by.avatar}
            }
            resizeMode="cover"
          />
        </View>
        <View style={AppStyles.mLeft15}>
          <HTMLView
            htmlContent={item.title}
            size={Fonts.size.small}
            color={Colors.text.primary}
            textAlign={util.rtlRightText()}
            type="semiBold"
          />
          {/* <Text
            textAlign={util.rtlRightText()}
            size={Fonts.size.small}
            color={Colors.text.primary}
            type="semiBold">
            {item.title}
          </Text> */}
          <View style={{maxWidth: '88%'}}>
            <HTMLView
              htmlContent={item.body}
              size={Fonts.size.xxSmall}
              color={Colors.text.quaternary}
              textAlign={util.rtlRightText()}
              type="semiBold"
              numberOfLines={3}
            />
            {/* <Text
              numberOfLines={3}
              textAlign={util.rtlRightText()}
              style={AppStyles.mTop5}
              size={Fonts.size.xxSmall}
              color={Colors.text.quaternary}
              type="semiBold">
              {item.body}
            </Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
