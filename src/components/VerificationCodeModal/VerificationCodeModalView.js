import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text} from '..';
import styles from './VerificationCodeModalStyles';
import {Colors, AppStyles, Metrics, Images, Fonts} from '../../theme';
import {PLACED_ORDER_TYPE, strings} from '../../constants';
import Button from '../Button';
import util from '../../util';

export default function VerificationCodeModalView(props) {
  const {isModalOpen, closeModal, modalType, request, handleSubmit, setValue} =
    props;
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}>
        <LinearGradient
          end={{x: 2.1, y: 0.7}}
          start={{x: 1.7, y: 1.8}}
          colors={Colors.gradient.primary}
          style={styles.modalStyle}>
          <View>
            <View
              style={[styles.upperContent, util.isRTL() && AppStyles.mRight20]}>
              <Text
                textAlign={util.rtlRightText()}
                type="medium"
                style={styles.contentTextStyle}>
                {strings.ASK_PROVIDER_VERIFICATION_CODE}
              </Text>
              {/* <TouchableOpacity
                onPress={() => closeModal({[modalType]: false})}>
                <Text
                  type="medium"
                  style={[
                    styles.contentTextStyle,
                    {paddingRight: 20, right: 10},
                  ]}>
                  X
                </Text>
              </TouchableOpacity> */}
            </View>

            <View
              style={[
                AppStyles.flexRow,
                AppStyles.mTop10,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <RnImage
                style={[AppStyles.mLeft10, util.isRTL() && AppStyles.mRight10]}
                source={Images.BagIcon}
              />
              <View style={!util.isRTL() && {marginLeft: Metrics.baseMargin}}>
                {request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL && (
                  <View
                    style={[
                      styles.wrapper,
                      AppStyles.flexRow,
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <Text
                      textAlign={util.rtlRightText()}
                      type="medium"
                      style={[styles.contentTextStyle]}>
                      {strings.USER.toUpperCase()}
                      {' : '}
                    </Text>
                    <Text
                      textAlign={util.rtlRightText()}
                      type="medium"
                      style={[styles.contentTextStyle]}>
                      {request.customer.name.toUpperCase()}
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    styles.wrapper,
                    AppStyles.flexRow,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <Text
                    textAlign={util.rtlRightText()}
                    type="medium"
                    style={styles.contentTextStyle}>
                    {strings.ORDER_CODE.toUpperCase()} {' : '}
                  </Text>
                  <Text
                    textAlign={util.rtlRightText()}
                    type="medium"
                    style={styles.contentTextStyle}>
                    {request.orders[0].id}
                  </Text>
                </View>
                {/* <View style={styles.codeInputWrap}>
                  <Text type="medium" style={[styles.contentTextStyle]}>
                    {`${strings.CONFIRMATION_CODE.toUpperCase()}: ${
                      // util.isEmptyNumber(request.confirmationCode) &&
                      request.confirmation_code
                    }`}
                  </Text>
                </View> */}
              </View>
            </View>
          </View>

          <View style={styles.btnWrap}>
            <Button
              textStyle={styles.btnTextStyle}
              style={[styles.btnStyle, styles.shadowStyle]}
              onPress={handleSubmit}>
              {strings.CONFIRM.toUpperCase()}
            </Button>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
