import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  RateMyServiceHeader,
  TextInput,
  Button,
  StarRating,
  RichTextEditor,
} from '../../components';
import styles from './RateMyServiceStyles';
import {PLACED_ORDER_TYPE, strings} from '../../constants';
import {Images, AppStyles, Colors, Metrics, Fonts} from '../../theme';

import util from '../../util';

export default function RateMyServiceView(props) {
  const {
    vendorRating,
    customerRating,
    vendorReview,
    customerReview,

    handleAddReviewAndRating,
    setValue,
    isLoading,
    request,
    refCustom,
    refDriver,
  } = props;

  // const {description , commentFocus} = props;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <RateMyServiceHeader />

      {/* <View style={styles.contentSec}>
        <View style={AppStyles.mBottom10}>
          <Text type="semiBold" size={Fonts.size.xxLarge}>
            {strings.THANKYOU} !!
          </Text>
        </View>
        <Text type="medium" size={Fonts.size.xxxSmall}>
          {strings.GLAD_YOU_HAD_GOOD_TRIP}
        </Text>
        <Text type="medium" size={Fonts.size.xxxSmall}>
          {strings.ANY_COMMENTS} ?
        </Text>
      </View> */}

      <View style={styles.inputWrap}>
        <Text
          textAlign={util.rtlRightText()}
          type="medium"
          size={Fonts.size.normal}>
          {strings.VENDOR}
        </Text>

        <View
          style={[
            AppStyles.flexRow,
            styles.providerRatingWrap,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          {/* <AirbnbRating
            count={5}
            defaultRating={0}
            size={23}
            showRating={false}
            onFinishRating={(number) => {
              setValue({vendorRating: number});
            }}
          /> */}

          <StarRating
            initialRating={vendorRating}
            readonly={false}
            imageSize={23}
            onChangeRating={(number) => {
              if (number >= 1) {
                setValue({vendorRating: number});
              }
            }}
          />
        </View>

        {/* <View style={AppStyles.rowReverse}>
         <TextInput
            multiline={true}
            placeholder={`${strings.ENTER_TEXT_HERE}....`}
            inputStyle={[styles.inputStyle]}
            style={[
              styles.addressInputWrap,
              util.isRTL() && AppStyles.alignRight,
            ]}
            value={vendorReview}
            onChangeText={(val) => {
              setValue({vendorReview: val});
            }}
          /> 
        </View> */}
        <View style={styles.richInputStyle}>
          <RichTextEditor
            value={vendorReview}
            placeholder={`${strings.ENTER_TEXT_HERE}....`}
            onChange={(text) => setValue({vendorReview: text})}
            textAlign={util.isRTL() ? 'right' : 'left'}
            fontSize={Fonts.size.xxSmall}
            showLateToolbar={true}
            heightInput={147}
            refRichText={refDriver}
          />
        </View>
      </View>

      {request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
        <View style={styles.inputWrap}>
          <Text
            textAlign={util.rtlRightText()}
            type="medium"
            size={Fonts.size.normal}>
            {strings.CUSTOMER}
          </Text>
          <View
            style={[
              AppStyles.flexRow,
              styles.providerRatingWrap,
              util.isRTL() && AppStyles.rowReverse,
            ]}>
            {/* <AirbnbRating
            count={5}
            defaultRating={0}
            size={23}
            showRating={false}
            onFinishRating={(number) => {
              setValue({customerRating: number});
            }}
          /> */}

            <StarRating
              initialRating={customerRating}
              readonly={false}
              imageSize={23}
              onChangeRating={(number) => {
                if (number >= 1) {
                  setValue({customerRating: number});
                }
              }}
            />
          </View>
          {/* <TextInput
          multiline={true}
          placeholder={`${strings.ENTER_TEXT_HERE}....`}
          inputStyle={styles.inputStyle}
          style={[
            styles.addressInputWrap,
            util.isRTL() && AppStyles.alignRight,
          ]}
          value={customerReview}
          onChangeText={(val) => {
            setValue({customerReview: val});
          }}
        /> */}
          <View style={styles.richInputStyle}>
            <RichTextEditor
              value={customerReview}
              onChange={(text) => setValue({customerReview: text})}
              textAlign={util.isRTL() ? 'right' : 'left'}
              fontSize={Fonts.size.xxSmall}
              showLateToolbar={true}
              heightInput={147}
              placeholder={`${strings.ENTER_TEXT_HERE}....`}
              refRichText={refCustom}
            />
          </View>
        </View>
      )}

      <View style={styles.submitBtnWrap}>
        <Button
          color={Colors.text.secondary}
          isLoading={isLoading}
          indicatorColor={Colors.loader.secondary}
          disabled={isLoading}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          onPress={() => handleAddReviewAndRating()}>
          {strings.SUBMIT.toUpperCase()}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
