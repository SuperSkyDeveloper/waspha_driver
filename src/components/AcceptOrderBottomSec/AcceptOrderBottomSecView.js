import React from 'react';
import {View, Image as RnImage, TouchableOpacity, Linking} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  Button,
  OptionsModal,
  RemoveItemModal,
  VerificationCodeModal,
} from '..';
import styles from './AcceptOrderBottomSecStyles';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import {
  strings,
  SPACE_LIMIT,
  RIDER_TYPE,
  PLACED_ORDER_TYPE,
} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';

export default function AcceptOrderBottomSecView(props) {
  const {
    btnLoading,
    onMapNavPress,
    shouldEnableContactOption,
    setValue,
    isChatOption,
    removeItemModal,
    cancelOrder,
    selectBtnText,
    setFunction,
    isVerificationModal,
    fromPickup,
    fromStartDelivery,
    request,
    renderFunction,
    fromAcceptOrder,
    user,
    isPhoneOption,
  } = props;
  const {customer, vendor} = request;

  // handle contact number
  // let contactNumber;
  // !fromPickup && !fromStartDelivery && (contactNumber = vendor.contact);

  // if (request.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
  //   (fromPickup || fromStartDelivery) && (contactNumber = customer.contact);
  // }
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.mapNavIconStyle,
          util.isRTL() && styles.mapNavIconStyleRtl,
        ]}
        onPress={onMapNavPress}>
        <RnImage source={Images.MapNavIcon} />
      </TouchableOpacity>
      <LinearGradient
        start={{x: -0.1, y: -0.05}}
        end={{x: 0.3, y: -1.4}}
        colors={Colors.gradient.primary}
        style={styles.mainSec}>
        <View style={[styles.contentSec, util.isRTL() && AppStyles.rowReverse]}>
          <View
            style={[
              styles.vendorShopIconWrap,
              !fromStartDelivery && styles.bgColor,
            ]}
          />
          {!fromPickup && !fromStartDelivery && (
            <RnImage
              source={util.vendorImagePlaceholder(vendor.image)}
              style={styles.vendorShopIcon}
            />
          )}
          {(fromPickup || fromStartDelivery) &&
            request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
              <RnImage
                source={util.customerImagePlaceholder(customer.avatar)}
                style={styles.customerIcon}
              />
            )}
          <View
            style={[
              styles.addressLandmarkSec,
              util.isRTL() && AppStyles.mTop20,
              util.isRTL() && AppStyles.mRight15,
            ]}>
            <View>
              <Text
                textAlign={util.rtlRightText()}
                size={Fonts.size.xxSmall}
                color={Colors.text.secondary}
                type="semiBold">
                {strings.ADDRESS}
              </Text>
              {request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL ? (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.text.secondary}
                  textAlign={util.rtlRightText()}>
                  {fromPickup || fromStartDelivery
                    ? request.customer &&
                      request.customer.location &&
                      request.customer.location.address
                    : util.isEmptyReturnValue(
                        vendor && vendor.location && vendor.location.address,
                      )}
                </Text>
              ) : (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.text.secondary}
                  textAlign={util.rtlRightText()}>
                  {fromPickup || fromStartDelivery
                    ? request.delivery_location &&
                      request.delivery_location.address
                    : util.isEmptyReturnValue(
                        request.pickup_location &&
                          request.pickup_location.address,
                      )}
                </Text>
              )}
            </View>
            <View style={AppStyles.mTop5}>
              {/* <Text
                size={Fonts.size.xxSmall}
                color={Colors.text.secondary}
                type="semiBold">
                {strings.LANDMARK.toUpperCase()}
              </Text> */}

              <Text size={Fonts.size.xxSmall} color={Colors.text.secondary}>
                {(fromPickup || fromStartDelivery) &&
                request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL
                  ? util.isEmptyReturnValue(
                      request.customer.location &&
                        request.customer.location.address.landmark,
                    )
                  : util.isEmptyReturnValue(
                      request.vendor.location &&
                        request.vendor.location.address.landmark,
                    )}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.userContactWrap,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          {(!_.isNil(vendor.contact) || !_.isNil(customer.contact)) && (
            <TouchableOpacity
              disabled={!shouldEnableContactOption}
              onPress={() => {
                if (request.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
                  Linking.openURL(`tel:${vendor.contact}`);
                } else {
                  setValue({isPhoneOption: true});
                }
              }}
              style={
                shouldEnableContactOption
                  ? [styles.contactImage, AppStyles.mRight5]
                  : [styles.disableContactImage, AppStyles.mRight5]
              }>
              <RnImage style={styles.image} source={Images.PhoneIcon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={!shouldEnableContactOption}
            onPress={() => setValue({isChatOption: true})}
            style={
              shouldEnableContactOption
                ? [styles.contactImage]
                : [styles.disableContactImage]
            }>
            <RnImage style={styles.image} source={Images.Chat} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrap}>
          <Button
            disabled={btnLoading}
            isLoading={btnLoading}
            color={Colors.text.secondary}
            type="medium"
            textStyle={styles.btnTextStyle}
            style={[styles.btnStyle, styles.shadowStyle]}
            indicatorColor={Colors.loader.secondary}
            onPress={() => renderFunction()}>
            {util.capitalizeSentence(selectBtnText())}
          </Button>
        </View>
        {user.type === RIDER_TYPE.WASPHA_EXPRESS && fromAcceptOrder && (
          <View style={styles.btnWrap}>
            <Button
              color={Colors.text.secondary}
              type="medium"
              textStyle={styles.btnTextStyle}
              style={[styles.btnStyle, styles.shadowStyle]}
              indicatorColor={Colors.loader.secondary}
              onPress={() =>
                Actions.cancelOrder({requestId: request.request_id})
              }>
              {strings.DECLINE.toUpperCase()}
            </Button>
          </View>
        )}
      </LinearGradient>
      {isChatOption && (
        <OptionsModal
          data={request}
          isModalOpen={isChatOption}
          closeModal={setValue}
          modalType="isChatOption"
          isTraditionalOrder={
            request.order_type === PLACED_ORDER_TYPE.TRADITIONAL
          }
        />
      )}

      {isPhoneOption && (
        <OptionsModal
          showPhoneOptions={true}
          showHeading={false}
          data={request}
          isModalOpen={isPhoneOption}
          closeModal={setValue}
          modalType="isPhoneOption"
        />
      )}

      {removeItemModal && (
        <RemoveItemModal
          isModalOpen={removeItemModal}
          btnOneFunc={cancelOrder}
          closeModal={setValue}
          modalType="removeItemModal"
        />
      )}

      {isVerificationModal && (
        <VerificationCodeModal
          isModalOpen={isVerificationModal}
          closeModal={setValue}
          modalType="isVerificationModal"
          handleOnPress={setFunction}
        />
      )}
    </View>
  );
}
