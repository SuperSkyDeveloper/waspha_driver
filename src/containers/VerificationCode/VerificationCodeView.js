import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import CountDown from 'react-native-countdown-component';
import Modal from 'react-native-modal';
import {
  Text,
  SignHeader,
  Button,
  TextInput,
  PhoneInput,
  Loader,
} from '../../components';
import styles from './VerificationCodeStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function VerificationCodeView(props) {
  const {
    setValue,
    otpCode,
    handleSubmit,
    otpCodeError,
    handleModal,
    editModalVisible,
    verificationAccount,
    verificationAccountError,
    fromSignUp,
    userId,
    isLoading,
    otp,
    handleResend,
    editAccount,
    editAccountError,
    handleEditDone,
    editAccountLoader,
    handleResetOTP,
    disableResendOTP,
    resetCountdownId,
    resendCodeLoading,
    dataFromProfile,
    fromProfile,
  } = props;

  const accountValue = _.isObject(verificationAccount)
    ? verificationAccount.phone_number
    : verificationAccount;

  const fromProfileValue =
    !_.isNil(dataFromProfile) && !_.isNil(dataFromProfile.user_id.country_code)
      ? `${dataFromProfile.user_id.country_code} ${dataFromProfile.user_id.number}`
      : _.isNil(dataFromProfile)
      ? ''
      : dataFromProfile.user_id;

  return (
    <>
      <Loader loading={resendCodeLoading} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid
        scrollEnabled
        enableAutomaticScroll
        //keyboardShouldPersistTaps="always"
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <SignHeader
              showMask={true}
              title={fromSignUp ? strings.ACCOUNT : strings.PASSWORD}
              subTitle={fromSignUp ? strings.VERIFICATION : strings.RECOVERY}
              mainHeading={strings.ENTER_VERIFICATION_CODE}
              drawerImg={Images.BackBtn}
            />
          </View>

          <View
            style={[
              styles.wrap,
              {
                paddingLeft: Metrics.doubleMediumBaseMargin,
                justifyContent: 'center',
              },
            ]}>
            <View style={[AppStyles.mBottom20]}>
              <View
                style={[
                  AppStyles.flexRow,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.black}
                  type="medium">
                  {strings.VERIFICATION_CODE_SEND_ON}
                  {'   '}
                </Text>
                {fromProfile ? (
                  <Text
                    size={Fonts.size.xxSmall}
                    color={Colors.text.primary}
                    type="bold">
                    {' '}
                    {fromProfileValue}{' '}
                  </Text>
                ) : (
                  <Text
                    size={Fonts.size.xxSmall}
                    color={Colors.text.primary}
                    type="bold">
                    {' '}
                    {accountValue}{' '}
                  </Text>
                )}
              </View>
              {fromSignUp && (
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={styles.size}
                    onPress={() => {
                      setValue({editModalVisible: true});
                    }}>
                    <Text
                      size={Fonts.size.xxSmall}
                      color={Colors.text.accent}
                      type="semiBold">
                      {strings.EDIT}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {editModalVisible && (
                <Modal
                  isVisible={editModalVisible}
                  style={{
                    alignItems: 'center',
                    margin: 20,
                  }}
                  onBackButtonPress={() => {
                    setValue({editModalVisible: false});
                  }}
                  onBackdropPress={() => {
                    setValue({editModalVisible: false});
                  }}
                  backdropOpacity={0.8}
                  backdropColor={Colors.background.tertiary}>
                  <View style={styles.modalWrap}>
                    <PhoneInput
                      onNumberChange={(val, ref) => {
                        setValue({editAccount: val});
                      }}
                      error={editAccountError}
                    />
                    <View
                      style={[AppStyles.mTop15, AppStyles.alignItemsFlexEnd]}>
                      {editAccountLoader && <ActivityIndicator />}
                      {!editAccountLoader && (
                        <TouchableOpacity
                          style={[
                            AppStyles.mTop15,
                            AppStyles.alignItemsFlexEnd,
                          ]}
                          onPress={handleEditDone}>
                          <Text
                            size={Fonts.size.xxSmall}
                            color={Colors.text.accent}
                            type="bold">
                            {strings.DONE}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </Modal>
              )}
            </View>
            <Text
              textAlign={util.isRTL() ? 'right' : 'left'}
              size={Fonts.size.xSmall}
              color={Colors.text.primary}
              type="bold">
              {strings.ENTER_CODE}
            </Text>
            {/* <Text
            size={Fonts.size.xSmall}
            color={Colors.text.primary}
            type="bold">
            {otp}
          </Text> */}
            <View style={AppStyles.mLeft25}>
              <CodeInput
                ref={(ref) => {
                  props.otpRef(ref);
                }}
                className={'border-b'}
                space={10}
                codeLength={4}
                size={60}
                inactiveColor={Colors.text.quaternary}
                activeColor={Colors.text.primary}
                inputPosition="left"
                autoFocus={true}
                cellBorderWidth={1.5}
                codeInputStyle={styles.square}
                containerStyle={{alignSelf: 'center'}}
                keyboardType="numeric"
                onFulfill={(data) => setValue({otpCode: data})}
              />
            </View>
            <Text
              type="medium"
              size={Fonts.size.xxSmall}
              color={Colors.error.primary}
              style={[AppStyles.mTop5, AppStyles.mBottom5]}>
              {otpCodeError}
            </Text>
            {!disableResendOTP && (
              <View
                style={[
                  styles.resendWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <TouchableOpacity
                  style={{right: -26}}
                  disabled={disableResendOTP}
                  onPress={() => handleResetOTP()}>
                  <Text
                    type="medium"
                    size={Fonts.size.xxSmall}
                    color={Colors.text.quaternary}
                    style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                    {strings.RESEND_OTP}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={
                // util.isRTL()
                //   ? {right: 30}
                //   : {flex: 1, alignSelf: 'center', left: -37}
                {
                  flex: 1,
                  alignSelf: 'center',
                  top: 20,
                  backgroundColor: Colors.background.quaternary,
                  borderRadius: 100,
                }
              }>
              <CountDown
                id={resetCountdownId}
                until={props.otpExpireTime}
                // until={'2021-01-19T07:57:48.000Z'}
                //duration of countdown in seconds
                timeToShow={['S']}
                //formate to show
                onFinish={() => setValue({disableResendOTP: false})}
                //on Finish call e
                digitStyle={{}}
                digitTxtStyle={{color: Colors.white}}
                timeLabels={{
                  // d: 'Days',
                  // h: 'Hours',
                  // m: 'Mins',
                  s: '',
                }}
                timeLabelStyle={{
                  color: Colors.red,
                  fontWeight: 'bold',

                  fontSize: 12,
                }}
                //on Press call
                size={26}
              />
            </View>
          </View>
          <View style={[styles.loginBtnWrap]}>
            <LinearGradient
              start={{x: 0.3, y: 2}}
              end={{x: 1, y: 0}}
              colors={Colors.gradient.primary}
              style={styles.gradBtn}>
              <Button
                color={Colors.button.hexa}
                background={Colors.transparent}
                style={styles.loginBtn}
                size={Fonts.size.normal}
                onPress={handleSubmit}
                isLoading={isLoading}
                indicatorColor={Colors.button.hexa}
                disabled={isLoading}
                type="semiBold">
                {strings.CONTINUE.toUpperCase()}
              </Button>
            </LinearGradient>
            <RnImage source={Images.Mask1} style={styles.mask2} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
