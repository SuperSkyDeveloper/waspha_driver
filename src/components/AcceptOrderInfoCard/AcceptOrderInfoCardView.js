import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {HTMLView, Text} from '..';
import styles from './AcceptOrderInfoCardStyles';

import {Colors, AppStyles, Fonts, Images} from '../../theme';
import {strings, TIME_FORMAT} from '../../constants';
import util from '../../util';

export default function AcceptOrderInfoCardView(props) {
  const {request, openCard, toggleCard, user, isCloseBox} = props;

  return (
    <View
      style={[
        styles.infoSec,
        openCard && styles.openStyle,
        styles.shadowStyle,
      ]}>
      {openCard ? (
        <>
          <View style={styles.rowStyling}>
            {!isCloseBox && (
              <TouchableOpacity
                onPress={toggleCard}
                style={[
                  util.isRTL()
                    ? styles.crossIconStyleRTL
                    : styles.crossIconStyle,
                ]}>
                <Text size={Fonts.size.xxxSmall}>X</Text>
              </TouchableOpacity>
            )}
            <View style={styles.rowStyling}>
              <View style={styles.firstpartStyle}>
                <Text
                  type="medium"
                  color={Colors.text.hexa}
                  size={Fonts.size.xxSmall}>
                  {util.isEmptyReturnValue(strings.ORDER_CODE.toUpperCase())}
                </Text>

                <Text
                  style={[AppStyles.mTop5, AppStyles.mLeft15]}
                  type="semiBold"
                  size={Fonts.size.normal}>
                  {util.isEmptyNumber(request.orders[0].id)}
                </Text>
              </View>
              <View
                style={[
                  util.isRTL()
                    ? {alignItems: 'center', right: -20}
                    : {maxWidth: '46%'},
                ]}>
                {!_.isEmpty(request && request.vendor) && (
                  <>
                    <HTMLView
                      htmlContent={util.isEmptyReturnValue(
                        request &&
                          request.vendor &&
                          request.vendor.name.toUpperCase(),
                      )}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      type="medium"
                      color={Colors.text.hexa}
                      size={Fonts.size.xxSmall}
                      style={{right: 10}}
                    />

                    <RnImage
                      source={util.vendorImagePlaceholder(
                        request && request.vendor && request.vendor.image,
                      )}
                      style={[AppStyles.mTop5, {width: 35, height: 35}]}
                      // width={35}
                      // height={25}
                    />
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={styles.seperatorLine} />
          <View style={styles.contentPart}>
            <View>
              <Text
                type="medium"
                color={Colors.text.hexa}
                size={Fonts.size.xxSmall}>
                {strings.PICK_UP_IN.toUpperCase()}
              </Text>
              <Text
                style={AppStyles.mTop5}
                type="semiBold"
                size={Fonts.size.normal}>
                {util.isEmptyReturnValue(
                  util.ISOToFormat(request.pickup_time, TIME_FORMAT),
                )}
              </Text>
            </View>
            <View>
              <Text
                type="medium"
                color={Colors.text.hexa}
                size={Fonts.size.xxSmall}>
                {strings.DELIVER_BEFORE.toUpperCase()}
              </Text>
              <Text
                style={AppStyles.mTop5}
                type="semiBold"
                size={Fonts.size.normal}>
                {util.isEmptyReturnValue(
                  util.ISOToFormat(request.delivery_time, TIME_FORMAT),
                )}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <TouchableOpacity onPress={toggleCard} style={styles.downIconStyle}>
          <RnImage source={Images.DownArrowIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}
