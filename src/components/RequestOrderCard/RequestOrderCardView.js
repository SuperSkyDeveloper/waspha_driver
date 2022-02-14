import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {StarRating, Text} from '..';
import styles from './RequestOrderCardStyles';
import {Images, AppStyles, Metrics, Fonts, Colors} from '../../theme';
import {PLACED_ORDER_TYPE, RIDER_TYPE, strings} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';

export default function RequestOrderCardView(props) {
  const {orderRequest} = props;
  const {customer, vendor} = orderRequest;

  console.log({orderRequest});

  return (
    <View style={[styles.container, styles.shadowStyle]}>
      <View style={[AppStyles.flexRow, util.isRTL() && AppStyles.rowReverse]}>
        {orderRequest.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
          <View
            style={[
              styles.customerSec,
              util.isRTL() && AppStyles.rowReverse,
              util.isRTL() && AppStyles.mLeft10,
            ]}>
            <View style={[styles.imageSize, util.isRTL() && AppStyles.mLeft10]}>
              <RnImage
                source={util.customerImagePlaceholder(customer.avatar)}
                style={styles.imageSize}
              />
              <View style={styles.badgeStyle}>
                <Text color="white" size={8} type="bold">
                  {util.isEmptyNumber(vendor.avg_rating)}
                </Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text
                type="medium"
                style={styles.titleStyle}
                textAlign={util.rtlRightText()}>
                {util.isEmptyReturnValue(customer.name)}
              </Text>
              <Text
                type="light"
                style={styles.descStyle}
                textAlign={util.rtlRightText()}>
                {util.isEmptyReturnValue(customer.about)}
              </Text>
              <View
                style={[
                  styles.riderRatingWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                {!_.isNil(customer) && !_.isNil(customer.avg_rating) && (
                  // <Rating
                  //   isDisabled={true}
                  //   ratingCount={5}
                  //   imageSize={13}
                  //   readonly={true}
                  //   startingValue={customer.avg_rating}
                  // />

                  <StarRating
                    initialRating={customer.avg_rating}
                    readonly={true}
                    imageSize={13}
                  />
                )}
              </View>
            </View>
          </View>
        )}
        <View
          style={[styles.customerSec, util.isRTL() && AppStyles.rowReverse]}>
          <RnImage
            source={util.vendorImagePlaceholder(vendor.image)}
            style={[styles.imageSize, util.isRTL() && AppStyles.mLeft10]}
          />
          <View style={styles.content}>
            <Text
              textAlign={util.rtlRightText()}
              type="medium"
              style={styles.titleStyle}>
              {util.isEmptyReturnValue(vendor.name)}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              type="light"
              style={styles.descStyle}>
              {util.isEmptyReturnValue(vendor.about)}
            </Text>
            <View
              style={[
                styles.riderRatingWrap,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              {!_.isNil(vendor) && !_.isNil(vendor.avg_rating) && (
                // <Rating
                //   isDisabled={true}
                //   ratingCount={5}
                //   imageSize={13}
                //   readonly={true}
                //   startingValue={vendor.avg_rating}
                // />
                <StarRating
                  initialRating={vendor.avg_rating}
                  readonly={true}
                  imageSize={13}
                />
              )}
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          Actions.recieveAmountDetails();
        }}
        style={[AppStyles.mTop15, styles.btnStyle, styles.shadowStyle]}
        color={Colors.text.secondary}>
        <Text style={styles.btnTextStyle} type="medium" textAlign="center">
          {strings.VIEW_ORDER_DETAILS.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
