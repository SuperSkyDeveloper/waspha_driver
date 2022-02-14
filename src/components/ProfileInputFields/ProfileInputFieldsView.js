import React from 'react';
import _ from 'lodash';
import {
  View,
  Platform,
  Image as RnImage,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {Text, TextInput} from '..';
import styles from './ProfileInputFieldsStyles';
import {Colors, AppStyles, Images, Metrics, Fonts} from '../../theme';
import {strings} from '../../constants';

import {Actions} from 'react-native-router-flux';
import util from '../../util';
export default function ProfileInputFieldsView(props) {
  const {
    vehicleName,
    vehicleNameError,
    regNo,
    regNoError,
    email,
    emailError,
    isSwitchActive,
    showByWalkFields,
    setValue,
    user,
    handleLogout,
    isEditAble,
  } = props;
  let link = util.isPlatformAndroid()
    ? 'https://play.google.com/store/apps/details?id=com.wasphariderapp'
    : 'https://apps.apple.com/pk/app/waspha-driver-app/id1549662949';

  return (
    <View style={styles.container}>
      {!showByWalkFields && (
        <View style={styles.inputWrap}>
          <View
            style={[styles.alignCenter, util.isRTL() && styles.alignCenterRtl]}>
            <RnImage
              source={Images.BikeIcon2}
              style={[styles.inputIcon, util.isRTL() && AppStyles.mLeft15]}
              tintColor={Colors.text.quaternary}
              resizeMode="contain"
            />

            <TextInput
              autoFocus={isEditAble ? true : false}
              editable={isEditAble ? true : false}
              inputStyle={[
                styles.inputStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              autoCapitalize="none"
              value={vehicleName}
              error={vehicleNameError}
              onChangeText={(val) => {
                setValue({vehicleName: val});
              }}
              ref={(ref) => {
                props.vehicleNameRef(ref);
              }}
            />
          </View>
          {/* <View>
            <Text type="medium" style={styles.verifiedText}>
              {util.isVerified(user.vehicle.is_verified)}
            </Text>
          </View> */}
        </View>
      )}

      {!showByWalkFields && (
        <View style={styles.inputWrap}>
          <View
            style={[styles.alignCenter, util.isRTL() && styles.alignCenterRtl]}>
            <RnImage
              source={Images.RegIcon}
              style={[styles.inputIcon, util.isRTL() && AppStyles.mLeft15]}
              tintColor={Colors.text.quaternary}
              resizeMode="contain"
            />
            <TextInput
              editable={isEditAble ? true : false}
              inputStyle={[
                styles.inputStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              autoCapitalize="none"
              value={regNo}
              error={regNoError}
              onChangeText={(val) => {
                setValue({regNo: val});
              }}
              ref={(ref) => {
                props.regNoRef(ref);
              }}
            />
          </View>
          {/* <Text type="medium" style={styles.verifiedText}>
            {util.isVerified(user.vehicle.is_verified)}
          </Text> */}
        </View>
      )}
      {/* {!showByWalkFields && (
        <View style={styles.inputWrap}>
          <View style={[styles.alignCenter,styles.alignCenterRtl]}>
            <View style={styles.blueCircle} />
            <TextInput
              editable={false}
              inputStyle={[styles.inputStyle,util.isRTL() && AppStyles.alignRight,
]}
              autoCapitalize="none"
              value={'Blue'}
            />
          </View>
          <View> */}
      {/* <Text type="medium" style={styles.verifiedText}>
              {util.isVerified(user.vehicle.is_verified)}
            </Text> */}
      {/* </View>
        </View>
      )} */}
      <TouchableOpacity
        onPress={() => {
          Actions.changeEmailAndNumber({isEmail: true, data: email});
        }}
        style={styles.inputWrap}>
        <View
          style={[styles.alignCenter, util.isRTL() && styles.alignCenterRtl]}>
          <RnImage
            source={Images.EmailIcon}
            style={[styles.inputIcon, util.isRTL() && AppStyles.mLeft15]}
            tintColor={Colors.text.quaternary}
            resizeMode="contain"
          />
          <TextInput
            editable={false}
            inputStyle={[
              styles.inputStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            autoCapitalize="none"
            value={email}
            error={emailError}
            onChangeText={(val) => {
              setValue({email: val});
            }}
            ref={(ref) => {
              props.emailRef(ref);
            }}
          />
          <View
            style={{
              top: -2,
            }}>
            <Text
              size={14}
              type="base"
              color={
                _.isEmpty(user.unverified) ||
                (!_.isEmpty(user.unverified) && _.isNil(user.unverified.email))
                  ? Colors.text.hepta
                  : Colors.text.error
              }>
              {_.isEmpty(user.unverified) ||
              (!_.isEmpty(user.unverified) && _.isNil(user.unverified.email))
                ? strings.VERIFIED
                : strings.UNVERIFIED}
            </Text>
          </View>
        </View>
        {/* <Text type="medium" style={styles.verifiedText}>
          {util.isVerified(user.email.is_verified)}
        </Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Actions.changeEmailAndNumber({isPhone: true});
        }}
        style={styles.inputWrap}>
        <View
          style={[styles.alignCenter, util.isRTL() && styles.alignCenterRtl]}>
          <RnImage
            source={Images.PhoneIcon}
            style={[styles.inputIcon, util.isRTL() && AppStyles.mLeft15]}
            tintColor={Colors.text.quaternary}
            resizeMode="contain"
          />
          <TextInput
            editable={false}
            inputStyle={[
              styles.inputStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            autoCapitalize="none"
            value={`${user.contact.country_code}${user.contact.number}`}
          />

          <View
            style={{
              top: -2,
            }}>
            <Text
              size={14}
              type="base"
              color={
                _.isEmpty(user.unverified) ||
                (!_.isEmpty(user.unverified) &&
                  _.isNil(user.unverified.contact))
                  ? Colors.text.hepta
                  : Colors.text.error
              }>
              {_.isEmpty(user.unverified) ||
              (!_.isEmpty(user.unverified) && _.isNil(user.unverified.contact))
                ? strings.VERIFIED
                : strings.UNVERIFIED}
            </Text>
          </View>
        </View>
        {/* <Text type="medium" style={styles.verifiedText}>
          {util.isVerified(user.contact.is_verified)}
        </Text> */}
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => Actions.resetPassword()}
        style={styles.nonInputField}>
        <View style={[styles.alignCenter,styles.alignCenterRtl]}>
          <RnImage
            source={Images.LockIcon}
            style={[styles.inputIcon,util.isRTL()&& AppStyles.mLeft15]}
            tintColor={Colors.text.quaternary}
            resizeMode="contain"
          />
          <Text
            style={styles.nonInputText}
            type="medium"
            size={Fonts.size.normal}>
            {strings.RESET_PASSWORD}
          </Text>
        </View>
      </TouchableOpacity> */}
      {/*
      <View
        style={[
          styles.nonInputField,
          AppStyles.flexRow,
          AppStyles.spaceBetween,
        ]}>
        <View>
          <RnImage
            source={Images.LanguageIcon}
            style={[styles.inputIcon,util.isRTL()&& AppStyles.mLeft15]}
            tintColor={Colors.text.quaternary}
            resizeMode="contain"
          />
          <Text
            style={styles.nonInputText}
            type="medium"
            size={Fonts.size.normal}>
            {strings.LANGUAGES}
          </Text>
        </View>
        <View style={styles.selectLanguageText}>
          <Text style={{top: -5}} type="medium" size={Fonts.size.xxSmall}>
            {strings.ENGLISH}
          </Text>
          <Switch
            trackColor={{
              false: Colors.button.tertiary,
              true: Colors.button.accent,
            }}
            thumbColor={
              isSwitchActive ? Colors.button.hexa : Colors.button.hexa
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setValue({isSwitchActive: !isSwitchActive})}
            value={isSwitchActive}
            style={
              util.isPlatformAndroid() ? styles.androidSize : styles.iosSize
            }
          />
        </View>
      </View> */}
      <TouchableOpacity
        onPress={() => util.rateApp(link)}
        style={styles.nonInputField}>
        <View
          style={[styles.alignCenter, util.isRTL() && styles.alignCenterRtl]}>
          <RnImage
            source={Images.EvaluateIcon}
            style={[styles.inputIcon, util.isRTL() && AppStyles.mLeft15]}
            tintColor={Colors.text.quaternary}
            resizeMode="contain"
          />
          <Text
            style={styles.nonInputText}
            type="medium"
            size={Fonts.size.normal}>
            {strings.EVALUATE_WASPHA}
          </Text>
        </View>
      </TouchableOpacity>

      {/* <View style={styles.nonInputField}>
        <RnImage
          source={Images.EstIcon}
          style={[styles.inputIcon,util.isRTL()&& AppStyles.mLeft15]}
          tintColor={Colors.text.quaternary}
          resizeMode="contain"
        />
        <Text
          style={styles.nonInputText}
          type="medium"
          size={Fonts.size.normal}>
          {strings.EST.toUpperCase()}
        </Text>
      </View> */}

      <TouchableOpacity
        onPress={() => handleLogout()}
        style={styles.nonInputField}>
        <View
          style={[styles.alignCenter, util.isRTL() && styles.alignCenterRtl]}>
          <RnImage
            source={Images.SignOutIcon}
            style={[styles.inputIcon, util.isRTL() && AppStyles.mLeft15]}
            tintColor={Colors.text.quaternary}
            resizeMode="contain"
          />
          <Text
            style={styles.nonInputText}
            type="medium"
            size={Fonts.size.normal}>
            {strings.SIGN_OUT}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
