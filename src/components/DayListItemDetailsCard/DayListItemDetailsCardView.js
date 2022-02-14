import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Dash from 'react-native-dash';
import {Text} from '..';
import styles from './DayListItemDetailsCardStyles';
import {Colors, AppStyles, Fonts, Images, Metrics} from '../../theme';
import {strings, DATE_TIME, TIME_FORMAT} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function DayListItemDetailsCardView(props) {
  const {
    isToggleAble,
    item,
    changeCardColor,
    active,
    handleIndex,
    index,
    user,
  } = props;
  return (
    <View
      style={[
        styles.parentWrap,
        util.isRTL()
          ? {marginLeft: Metrics.baseMargin}
          : {marginRight: Metrics.baseMargin},
      ]}>
      {isToggleAble && (
        <View
          style={[
            styles.timeAndOrderCodeWrap,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          <Text
            size={Fonts.size.xxxSmall}
            type="semiBold"
            color={Colors.text.primary}
            style={styles.smallHeadingText}>
            {`${ISOToFormat(item.deliveryDate, 'MMM DD')} - ${ISOToFormat(
              item.deliveryDate,
              TIME_FORMAT,
            )}`}
          </Text>
          {!_.isNil(item.order_code) && (
            <Text
              type="semiBold"
              size={Fonts.size.xxxSmall}
              color={Colors.text.primary}
              style={styles.smallHeadingText}>
              {`${strings.ORDER_CODE}:${item.order_code}`}
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.locationSec,
          util.isRTL() && AppStyles.rowReverse,
          changeCardColor
            ? [styles.changeCardColorStyle, styles.shadowStyle]
            : {backgroundColor: Colors.background.heca},
        ]}>
        <View>
          <View style={[styles.dotStyle]} />
          <View style={[styles.dashWrap]}>
            <Dash
              style={[styles.dashStyle]}
              dashLength={2.2}
              dashGap={6}
              dashThickness={2.1}
              dashColor={Colors.border.teka}
            />
          </View>
          <View style={[styles.dotStyle]} />
        </View>

        <View>
          <View style={[styles.boxSec, AppStyles.mBottom10]}>
            <View
              style={[styles.spacing, util.isRTL() && AppStyles.rowReverse]}>
              {!_.isNil(item.customer.id) && (
                <View>
                  <Text
                    size={isToggleAble ? Fonts.size.xxSmall : 8}
                    color={Colors.text.neka}
                    style={styles.smallHeadingText}
                    textAlign={util.rtlRightText()}>
                    {strings.USER_NAME}
                  </Text>

                  <Text
                    size={
                      isToggleAble ? Fonts.size.xxSmall : Fonts.size.xxxxSmall
                    }
                    textAlign={util.rtlRightText()}
                    color={Colors.text.yeka}
                    type="medium">
                    {item.customer.name}
                  </Text>
                </View>
              )}

              {!isToggleAble && !_.isNil(item.order_code) && (
                <View
                  style={
                    _.isNil(item.customer.id)
                      ? {
                          flex: 1,
                          alignItems: 'flex-end',
                        }
                      : {}
                  }>
                  <Text
                    size={Fonts.size.xxxxSmall}
                    color={Colors.text.secondary}
                    style={[styles.smallHeadingText]}>
                    {`${strings.ORDER_CODE} : ${item.order_code}`}
                  </Text>
                </View>
              )}
            </View>
            {!isToggleAble && !_.isNil(item.customer.id) && (
              <View
                style={[
                  AppStyles.mTop10,
                  {maxWidth: '70%'},
                  util.isRTL() && {
                    alignSelf: 'flex-end',
                  },
                ]}>
                <Text
                  textAlign={util.rtlRightText()}
                  color={Colors.text.neka}
                  size={8}
                  textAlign={util.rtlRightText()}
                  style={styles.smallHeadingText}>
                  {strings.ORDER_DETAILS}
                </Text>
                <Text
                  size={Fonts.size.xxxxSmall}
                  color={Colors.text.yeka}
                  style={styles.smallHeadingText}>
                  {item.order_details}
                </Text>
              </View>
            )}

            {isToggleAble && !active && !_.isNil(item.customer.id) && (
              <View
                style={[
                  AppStyles.mTop10,
                  {maxWidth: '80%'},
                  util.isRTL() && {
                    alignSelf: 'flex-end',
                  },
                ]}>
                <Text
                  textAlign={util.rtlRightText()}
                  color={Colors.text.neka}
                  size={isToggleAble ? Fonts.size.xxSmall : 8}
                  style={styles.smallHeadingText}>
                  {strings.ORDER_DETAILS}
                </Text>
                <Text
                  textAlign={util.rtlRightText()}
                  size={
                    isToggleAble ? Fonts.size.xxSmall : Fonts.size.xxxxSmall
                  }
                  color={Colors.text.yeka}
                  style={styles.smallHeadingText}>
                  {item.order_details}
                </Text>
              </View>
            )}
          </View>
          <View
            style={[
              styles.borderStyling,
              !_.isNil(item.customer.id) && {
                borderTopColor: Colors.border.secondary,
                borderTopWidth: 1,
                opacity: 1,
              },
            ]}></View>
          <View style={styles.boxSec}>
            <View>
              <Text
                size={isToggleAble ? Fonts.size.xxSmall : 8}
                color={Colors.text.neka}
                textAlign={util.rtlRightText()}
                style={styles.smallHeadingText}>
                {strings.STORE_NAME}
              </Text>
              <Text
                size={isToggleAble ? Fonts.size.xxSmall : Fonts.size.xxxxSmall}
                color={Colors.text.yeka}
                type="medium"
                textAlign={util.rtlRightText()}
                style={styles.locationText}>
                {item.vendor.name}
              </Text>
            </View>

            {!isToggleAble && (
              <View
                style={[
                  styles.spacing,
                  AppStyles.mTop10,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <View>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={8}
                    color={Colors.text.neka}
                    style={styles.smallHeadingText}
                    textAlign={util.rtlRightText()}>
                    {strings.DELIVERY_TIME}
                  </Text>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={Fonts.size.xxxSmall}
                    color={Colors.text.yeka}
                    type="medium"
                    style={styles.locationText}>
                    {ISOToFormat(item.deliveryDate, DATE_TIME)}
                  </Text>
                </View>
                <View style={AppStyles.mRight20}>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={8}
                    color={Colors.text.neka}
                    style={styles.smallHeadingText}
                    textAlign={util.rtlRightText()}>
                    {strings.CASH_COLLECTED}
                  </Text>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={Fonts.size.xxxSmall}
                    color={Colors.text.yeka}
                    type="medium"
                    style={styles.locationText}>
                    {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
                    {item.price}
                  </Text>
                </View>
              </View>
            )}

            {isToggleAble && !active && (
              <View style={[styles.spacing, AppStyles.mTop10]}>
                <View>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={isToggleAble ? Fonts.size.xxSmall : 8}
                    color={Colors.text.neka}
                    style={styles.smallHeadingText}>
                    {strings.DELIVERY_TIME}
                  </Text>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={Fonts.size.xxxSmall}
                    color={Colors.text.yeka}
                    type="medium"
                    style={styles.locationText}>
                    {ISOToFormat(item.deliveryDate, DATE_TIME)}
                  </Text>
                </View>
                <View style={AppStyles.mRight20}>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={isToggleAble ? Fonts.size.xxSmall : 8}
                    color={Colors.text.neka}
                    style={styles.smallHeadingText}>
                    {strings.CASH_COLLECTED}
                  </Text>
                  <Text
                    textAlign={util.rtlRightText()}
                    size={Fonts.size.xxxSmall}
                    color={Colors.text.yeka}
                    type="medium"
                    style={styles.locationText}>
                    {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
                    {item.price}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        {isToggleAble && !_.isNil(item.customer.id) && (
          <TouchableOpacity
            onPress={() => handleIndex(index)}
            style={styles.toggleIconWrap}>
            <RnImage
              source={Images.Icon2}
              style={[
                active && styles.arrowImg,
                {tintColor: Colors.text.primary},
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
