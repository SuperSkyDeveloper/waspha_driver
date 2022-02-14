import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {HTMLView, Text} from '..';
import styles from './OrderListStyles';
import {strings, PROMO_TYPES} from '../../constants';
import {Metrics, Images, Colors, AppStyles, Fonts} from '../../theme';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function OrderListView(props) {
  const {items, fromAtDelivery, showNoOfItems} = props;

  return (
    <View style={[styles.container]}>
      {showNoOfItems && (
        <View
          style={[
            styles.showNoOfItemsWrap,
            styles.shadowStyle,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          <View style={[styles.bagIcon, AppStyles.mRight10]}>
            <RnImage
              source={Images.BagIcon}
              resizeMode="contain"
              style={styles.bagIcon}
              tintColor={Colors.text.primary}
            />
          </View>
          <Text type="semiBold">
            {`${fromAtDelivery ? strings.DELIVER : strings.PICK_UP} ${
              items.length
            } ${items.length > 1 ? strings.ITEMS : strings.ITEM} `}
          </Text>
        </View>
      )}

      <View
        style={[
          styles.contentSec,
          styles.shadowStyle2,
          util.isRTL() && AppStyles.rowReverse,
        ]}>
        <View style={styles.tableHeadWrap}>
          <Text type="semiBold" style={styles.tableHeadText}>
            {strings.DETAILS}
          </Text>
        </View>
        <View
          style={[
            styles.tableHeadWrap,
            !util.isRTL() && [styles.borderLine],
            util.isRTL() && [styles.borderLineRtl],
          ]}>
          <Text
            type="semiBold"
            style={[
              styles.tableHeadText,
              util.isRTL() ? {left: 25} : {right: 20},
            ]}>
            {strings.QTY}
          </Text>
        </View>
      </View>

      <View style={[styles.itemsContent, styles.shadowStyle2]}>
        {items &&
          items.map((item) => (
            <View
              style={[styles.itemsSec, util.isRTL() && AppStyles.rowReverse]}>
              {/* <Text
                type="medium"
                style={[styles.itemText, {marginLeft: Metrics.smallMargin}]}>
                {renderNameStringAndImageRender(item.title)}
              </Text> */}

              <HTMLView
                htmlContent={renderNameStringAndImageRender(item.title)}
                type="medium"
                style={[styles.itemText, {marginLeft: Metrics.smallMargin}]}
              />

              {!_.isNil(item.menu_promotion) &&
                item.menu_promotion.type === PROMO_TYPES.GIFT_PRODUCT && (
                  <Text
                    type={'semiBold'}
                    style={{position: 'absolute', top: 17, left: 26}}
                    size={Fonts.size.xxxSmall}>
                    {`${
                      !_.isNil(item.menu_promotion.extra_data)
                        ? `${
                            strings.GIFT_PRODUCT
                          } : ${renderNameStringAndImageRender(
                            item.menu_promotion.extra_data.product_name,
                          )}`
                        : ''
                    } x ${item.quantity}`}
                  </Text>
                )}
              <View
                style={[
                  styles.qtyWrap,
                  util.isRTL() ? {right: 40} : {left: 12},
                ]}>
                <Text type="medium" style={[styles.itemText]}>
                  {`${
                    !_.isNil(item.menu_promotion) &&
                    item.menu_promotion.type === PROMO_TYPES.BUY_1_GET_1
                      ? item.quantity * 2
                      : item.quantity
                  } `}
                </Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}
