import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';

import {Text, Button, PaymentBreakDown} from '..';
import styles from './PaymentBreakDownStyles';
import {Colors, AppStyles, Metrics, Images, Fonts} from '../../theme';
import {
  PAYMENT_TYPE,
  PLACED_ORDER_TYPE,
  RIDER_TYPE,
  strings,
} from '../../constants';
import util from '../../util';

export default function PaymentBreakDownView(props) {
  const {
    data,
    handleShareBtn,
    paymentTypeOfUser,
    user,
    billItems,
    isDiscounted,
    validateApplyPromo,
    getPromoCodeTotal,
    orderRequest,
  } = props;
  let currencyCode = _.isNil(user.currency_code) ? 'ESP' : user.currency_code;
  // let data={...props.data, waspha_fee_type_user: "fixed"}
  console.log({data});
  return (
    <View style={[styles.container, styles.shadowStyle]}>
      <View
        style={[styles.socialIconWrap, util.isRTL() && AppStyles.rowReverse]}>
        <Text textAlign={util.rtlRightText()}>{strings.PAYMENT_AMOUNT}</Text>

        <TouchableOpacity onPress={handleShareBtn}>
          <RnImage source={Images.SocialIcon} style={{top: -10}} />
        </TouchableOpacity>
      </View>

      {data &&
        billItems.map((item, index) => {
          if (
            item.key === 'waspha_fee_amount_vendor' ||
            item.key === 'waspha_fee_vendor'
          ) {
            return true;
          }

          if (
            data.waspha_fee_type_user === 'fixed' &&
            item.key === 'waspha_fee_amount_user'
          ) {
            return true;
          }

          if (
            data.order_type === PLACED_ORDER_TYPE.TRADITIONAL &&
            item.key !== 'estimate_delivery_fee' &&
            item.key !== 'package_charges'
          ) {
            return true;
          }

          return (
            <View
              style={[styles.contentSec, util.isRTL() && AppStyles.rowReverse]}>
              <View
                style={[
                  styles.titleWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <View
                  style={[styles.circleStyle, util.isRTL() && AppStyles.mLeft5]}
                />
                <View>
                  <Text
                    type="medium"
                    style={styles.textStyle}
                    textAlign={util.rtlRightText()}>
                    {item.key === 'waspha_fee_user' ||
                    item.key === 'waspha_fee_amount_user'
                      ? `${item.label} User`
                      : item.label}
                  </Text>
                  {validateApplyPromo(item) && (
                    <Text
                      type="medium"
                      style={styles.textStyle}
                      textAlign={util.rtlRightText()}>
                      {`(${strings.PROMO_APPLIED})`}
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={[
                  styles.priceWrap,
                  util.isRTL() ? {left: 35} : {right: -20},
                ]}>
                <Text
                  textAlign={util.rtlRightText()}
                  type="medium"
                  style={[
                    styles.textStyle,
                    util.isRTL() ? AppStyles.mRight10 : {left: 47},
                    ((item.key === 'subtotal' && isDiscounted) ||
                      validateApplyPromo(item)) && {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    },
                  ]}>
                  {/* {item.key.includes('ratio') */}

                  {orderRequest.delivery_mode === RIDER_TYPE.WASPHA_EXPRESS &&
                  item.key === 'delivery_fee'
                    ? '--'
                    : data.waspha_fee_type_user === 'percentage' &&
                      item.key === 'waspha_fee_user'
                    ? `${item.value} %`
                    : `${currencyCode} ${item.value.toFixed(2)}`}
                </Text>
                {validateApplyPromo(item) &&
                  !_.isNil(data.total.discounted_value) && (
                    <Text
                      textAlign={util.rtlRightText()}
                      type="medium"
                      style={[
                        styles.textStyle,
                        util.isRTL() ? AppStyles.mRight10 : {left: 47},
                      ]}>
                      {`${currencyCode} ${data.total.discounted_value.toFixed(
                        2,
                      )}`}
                    </Text>
                  )}
              </View>
            </View>
          );
        })}

      <View style={styles.contentSec}></View>
      <View style={[styles.contentSec, util.isRTL() && AppStyles.rowReverse]}>
        <View
          style={[
            styles.toBePaidWrap,
            styles.dashOneStyle,
            util.isRTL() && AppStyles.mRight15,
          ]}>
          <Text
            type="medium"
            style={[styles.textStyle, util.isRTL() && AppStyles.mTop10]}
            textAlign={util.rtlRightText()}>
            {util.isEmptyReturnValue(data.total.label)}
          </Text>
          {getPromoCodeTotal() && (
            <Text
              type="medium"
              style={[styles.textStyle, util.isRTL() && AppStyles.mTop10]}
              textAlign={util.rtlRightText()}>
              {`(${strings.PROMO_APPLIED})`}
            </Text>
          )}
        </View>
        <View style={[styles.totalAmountWrap, styles.dashTwoStyle]}>
          <Text
            type="medium"
            style={[
              styles.textStyle,
              util.isRTL() && AppStyles.mTop10,
              getPromoCodeTotal() && {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              },
            ]}
            textAlign={util.rtlRightText()}>
            {`${currencyCode} ${util.isEmptyNumber(
              data.total.value.toFixed(2),
            )}`}
          </Text>
          {getPromoCodeTotal() && (
            <Text
              type="medium"
              style={[styles.textStyle, util.isRTL() && AppStyles.mTop10]}
              textAlign={util.rtlRightText()}>
              {`${currencyCode} ${data.total.discounted_value.toFixed(2)}`}
            </Text>
          )}
        </View>
      </View>
      <View
        style={[
          styles.contentSec,
          util.isRTL() && AppStyles.rowReverse,
          util.isRTL() && AppStyles.mLeft15,
        ]}>
        <View style={[styles.toBePaidWrap]}>
          <Text type="semiBold" size={14} textAlign={util.rtlRightText()}>
            {strings.PAYMENT_TYPE} {':'}
          </Text>
        </View>
        <View
          style={[styles.totalAmountWrap, util.isRTL() && AppStyles.mLeft10]}>
          <Text type="semiBold" textAlign={util.rtlRightText()} size={14}>
            {paymentTypeOfUser === PAYMENT_TYPE.WALLET && `Wallet`}
            {paymentTypeOfUser === PAYMENT_TYPE.CASH_ON_DELIVERY &&
              `Cash on Delivery`}
            {paymentTypeOfUser === PAYMENT_TYPE.CREDIT_CARD && ` Credit Card`}
          </Text>
        </View>
      </View>
    </View>
  );
}
