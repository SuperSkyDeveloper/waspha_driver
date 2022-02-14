import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, TextInput, Button, CustomNavbar} from '../../components';
import styles from './ResetPasswordStyles';
import {Images, AppStyles, Colors, Metrics} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';

export default function ResetPasswordView(props) {
  const {
    currentPassword,
    currentPasswordError,
    newPassword,
    newPasswordError,
    retypePassword,
    retypePasswordError,
    currentPasswordFocus,
    newPasswordFocus,
    retypePasswordFocus,
    hideCurrentPassword,
    hideNewPassword,
    hideRetypePassword,
    setValue,
    isLoading,
  } = props;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <CustomNavbar
        title={strings.RESET_PASSWORD}
        titleColor={Colors.text.secondary}
        hasBottomRadius={true}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Metrics.tripleBaseMargin,
          marginBottom: Metrics.mediumBaseMargin,
        }}>
        <RnImage source={Images.LockIcon2} />
      </View>
      <View style={styles.contentSec}>
        <View style={AppStyles.mTop30}>
          <TextInput
            placeholder={strings.CURRENT_PASSWORD}
            // placeholderTextColor={Colors.text.penta}
            textAlign={util.isRTL() ? 'right' : 'left'}
            inputStyle={[
              AppStyles.inputStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            secureTextEntry={hideCurrentPassword}
            autoCapitalize="none"
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            value={currentPassword}
            error={currentPasswordError}
            onChangeText={(val) => {
              setValue({currentPassword: val});
            }}
            ref={(ref) => {
              props.currentPasswordRef(ref);
            }}
            onSubmitEditing={newPasswordFocus}
          />
          <TouchableOpacity
            style={[
              styles.showPwsdWrap,
              util.isRTL() && styles.showPwsdWrapRtl,
            ]}
            onPress={() => {
              setValue({hideCurrentPassword: !hideCurrentPassword});
            }}>
            <RnImage
              source={
                hideCurrentPassword
                  ? Images.ViewPasswordIcon
                  : Images.HidePasswordIcon
              }
            />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.mTop30}>
          <TextInput
            placeholder={strings.NEW_PASSWORD}
            // placeholderTextColor={Colors.text.penta}
            inputStyle={AppStyles.inputStyle}
            secureTextEntry={hideNewPassword}
            autoCapitalize="none"
            textAlign={util.isRTL() ? 'right' : 'left'}
            labelStyle={AppStyles.labelStyle}
            value={newPassword}
            error={newPasswordError}
            onChangeText={(val) => {
              setValue({newPassword: val});
            }}
            ref={(ref) => {
              props.newPasswordRef(ref);
            }}
            onSubmitEditing={retypePasswordFocus}
          />
          <TouchableOpacity
            style={[
              styles.showPwsdWrap,
              util.isRTL() && styles.showPwsdWrapRtl,
            ]}
            onPress={() => {
              setValue({hideNewPassword: !hideNewPassword});
            }}>
            <RnImage
              source={
                hideNewPassword
                  ? Images.ViewPasswordIcon
                  : Images.HidePasswordIcon
              }
            />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.mTop30}>
          <TextInput
            placeholder={strings.RETYPE_PASSWORD}
            // placeholderTextColor={Colors.text.penta}
            inputStyle={AppStyles.inputStyle}
            textAlign={util.isRTL() ? 'right' : 'left'}
            secureTextEntry={hideRetypePassword}
            autoCapitalize="none"
            labelStyle={AppStyles.labelStyle}
            value={retypePassword}
            error={retypePasswordError}
            onChangeText={(val) => {
              setValue({retypePassword: val});
            }}
            ref={(ref) => {
              props.retypePasswordRef(ref);
            }}
            onSubmitEditing={props.handleSubmit}
          />

          <TouchableOpacity
            style={[
              styles.showPwsdWrap,
              util.isRTL() && styles.showPwsdWrapRtl,
            ]}
            onPress={() => {
              setValue({hideRetypePassword: !hideRetypePassword});
            }}>
            <RnImage
              source={
                hideRetypePassword
                  ? Images.ViewPasswordIcon
                  : Images.HidePasswordIcon
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.submitBtnWrap}>
          <Button
            indicatorColor={Colors.loader.secondary}
            color={Colors.text.secondary}
            style={styles.submitBtn}
            isLoading={isLoading}
            disabled={isLoading}
            textStyle={styles.submitBtnText}
            onPress={props.handleSubmit}>
            {strings.SAVE.toUpperCase()}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
