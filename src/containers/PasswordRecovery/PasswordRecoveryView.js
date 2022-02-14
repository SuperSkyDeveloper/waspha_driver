import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {Text, SignHeader, Button, TextInput} from '../../components';
import styles from './PasswordRecoveryStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../../constants';
import util from '../../util';

export default function PasswordRecoveryView(props) {
  const {
    setValue,
    otpCode,
    retypePwd,
    password,
    passwordError,
    handleSubmit,
    hideRetypePwd,
    hidePassword,
    retypePwdError,
    isLoading,
  } = props;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View>
        <SignHeader
          showMask={true}
          title={strings.PASSWORD}
          subTitle={strings.RECOVERY}
          mainHeading={strings.RESET_YOUR_PASSWORD}
        />
        {/*  */}
        <View style={styles.wraper}>
          <View style={AppStyles.mTop40}>
            <TextInput
              inputStyle={[
                AppStyles.inputStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              labelStyle={[
                AppStyles.labelStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              label={strings.NEW_PASSWORD.toUpperCase()}
              secureTextEntry={hidePassword}
              value={password}
              error={passwordError}
              onChangeText={(val) => {
                setValue({password: val});
              }}
              ref={(ref) => {
                props.passRef(ref);
              }}
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              style={[
                styles.showPwsdWrap,
                util.isRTL() && styles.showPwsdWrapRtl,
              ]}
              onPress={() => {
                setValue({hidePassword: !hidePassword});
              }}>
              <RnImage
                source={
                  hidePassword
                    ? Images.ViewPasswordIcon
                    : Images.HidePasswordIcon
                }
                style={styles.ViewPasswordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={AppStyles.mTop30}>
            <TextInput
              inputStyle={[
                AppStyles.inputStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              labelStyle={[
                AppStyles.labelStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              label={strings.RETYPE_PASSWORD.toUpperCase()}
              secureTextEntry={hideRetypePwd}
              value={retypePwd}
              error={retypePwdError}
              onChangeText={(val) => {
                setValue({retypePwd: val});
              }}
              ref={(ref) => {
                props.retypePwdRef(ref);
              }}
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              style={[
                styles.showPwsdWrap,
                util.isRTL() && styles.showPwsdWrapRtl,
              ]}
              onPress={() => {
                setValue({hideRetypePwd: !hideRetypePwd});
              }}>
              <RnImage
                source={
                  hideRetypePwd
                    ? Images.ViewPasswordIcon
                    : Images.HidePasswordIcon
                }
                style={styles.ViewPasswordIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}

        <View style={[styles.continueBtnWrap]}>
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
  );
}
