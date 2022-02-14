import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  SelectLanguageModal,
  TextInput,
  Button,
  SignWithSection,
} from '../../components';
import styles from './LoginStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {
  strings,
  PASSWORD_PLACEHOLDER,
  LOGIN_PLACEHOLDER,
} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';

export default function LoginView(props) {
  const {
    setValue,
    userId,
    password,
    userIdError,
    passwordError,
    handleSubmit,
    passwordFocus,
    hidePassword,
    handleShowPassword,
    stayLogged,
    handleStayLogged,
    isLoading,
    isLangModalVisible,
    handleChangeLanguage,
    handleLanguageModal,
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
        <ImageBackground
          source={Images.LoginBg}
          style={styles.bgImage}
          resizeMode="cover">
          <View style={styles.loginContent}>
            <Text
              textAlign={util.rtlRightText()}
              color={Colors.text.secondary}
              size={Fonts.size.medium}>
              {strings.WE_ARE.toUpperCase()}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              color={Colors.text.secondary}
              size={Fonts.size.xxxxxLarge}
              style={AppStyles.lHeight55}>
              {strings.WASPHA.toUpperCase()}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              color={Colors.text.secondary}
              size={Fonts.size.normal}
              type="light"
              style={AppStyles.mTop15}>
              {`${strings.WELCOME_PLEASE_LOGIN_TO_YOUR_ACCOUNT}`}
            </Text>
          </View>
        </ImageBackground>

        {/* <SignWithSection login={true} /> */}

        <View style={styles.loginSection}>
          <RnImage source={Images.Mask3} style={styles.mask3} />
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            placeholder={LOGIN_PLACEHOLDER}
            autoCapitalize="none"
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            placeholderTextColor={Colors.text.quaternary}
            inputStyle={[
              AppStyles.inputStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            labelImg={Images.IdCardIcon}
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            label={strings.MOBILE_EMAIL}
            labelImgStyle={[
              AppStyles.labelImgStyle,
              util.isRTL() && AppStyles.labelImgStyleRtl,
            ]}
            value={userId}
            error={userIdError}
            onChangeText={(val) => {
              setValue({userId: val});
            }}
            ref={(ref) => {
              props.userIdRef(ref);
            }}
            onSubmitEditing={passwordFocus}
          />
          <View style={AppStyles.mTop30}>
            <View>
              <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={PASSWORD_PLACEHOLDER}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={[
                  AppStyles.inputStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                labelImg={Images.LockIcon}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.PASSWORD}
                labelImgStyle={[
                  AppStyles.labelImgStyle,
                  util.isRTL() && AppStyles.labelImgStyleRtl,
                ]}
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
                onPress={handleShowPassword}>
                <RnImage
                  source={
                    hidePassword
                      ? Images.ViewPasswordIcon
                      : Images.HidePasswordIcon
                  }
                  style={styles.viewPasswordIcon}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[styles.forgetWrap, util.isRTL() && AppStyles.rowReverse]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.forgetPwd, util.isRTL() && AppStyles.rowReverse]}
                onPress={handleStayLogged}>
                {stayLogged ? (
                  <RnImage
                    style={[AppStyles.mRight5, styles.radioBtn]}
                    source={Images.RememberIcon}
                  />
                ) : (
                  <View style={styles.radioBtn} />
                )}
                <Text
                  size={Fonts.size.xxxxSmall}
                  style={util.isRTL() && AppStyles.mRight10}
                  color={Colors.text.primary}>
                  {strings.STAY_LOGGED_IN}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgetPwd}
                onPress={() => {
                  Actions.forgetPassword();
                }}>
                <Text size={Fonts.size.xxxxSmall} color={Colors.text.primary}>
                  {`${strings.FORGOT_PASSWORD} ${util.isRTL() ? '؟' : '?'}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <RnImage source={Images.Mask1} style={styles.mask1} />
        </View>
        <View style={[styles.loginBtnWrap, styles.paddingHr]}>
          <LinearGradient
            start={{x: 0.3, y: 2}}
            end={{x: 1, y: 0}}
            colors={Colors.gradient.primary}
            style={styles.gradBtn}>
            <Button
              isLoading={isLoading}
              color={Colors.text.secondary}
              background={Colors.transparent}
              style={styles.loginBtn}
              size={Fonts.size.normal}
              onPress={handleSubmit}
              indicatorColor={Colors.text.secondary}
              disabled={false}
              type="semiBold">
              {strings.LOGIN.toUpperCase()}
            </Button>
          </LinearGradient>
        </View>

        <View
          style={[
            styles.signupSec,
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          ]}>
          <Text size={Fonts.size.xxSmall}>
            {' '}
            {`${strings.DONT_HAVE_AN_ACCOUNT}${util.isRTL() ? '؟ ' : '? '}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Actions.signup();
            }}>
            <Text size={Fonts.size.xxSmall} color={Colors.text.accent}>
              {strings.SIGNUP}
            </Text>
          </TouchableOpacity>
          <RnImage source={Images.Mask2} style={styles.mask2} />
        </View>
        <View style={[styles.loginBtnWrap, styles.paddingHr]}>
          <LinearGradient
            start={{x: 0.3, y: 2}}
            end={{x: 1, y: 0}}
            colors={Colors.gradient.primary}
            style={styles.gradBtn}>
            <Button
              color={Colors.text.secondary}
              background={Colors.transparent}
              style={styles.loginBtn}
              size={Fonts.size.normal}
              onPress={() => handleLanguageModal()}
              indicatorColor={Colors.text.secondary}
              type="semiBold">
              {_.toUpper(strings.LANGUAGES)}
            </Button>
          </LinearGradient>
        </View>
        {isLangModalVisible && (
          <SelectLanguageModal
            isModalOpen={isLangModalVisible}
            closeModal={setValue}
            modalType="isLangModalVisible"
            handleLangSelect={handleChangeLanguage}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
