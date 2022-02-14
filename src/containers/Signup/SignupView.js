import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import {GENDER_LIST} from '../../constants';
import CheckBox from '@react-native-community/checkbox';
import {
  Text,
  TextInput,
  Button,
  SignWithSection,
  ContactInput,
  SelectLanguageModal,
  Loader,
} from '../../components';
import styles from './SignupStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {strings, PASSWORD_PLACEHOLDER} from '../../constants';
import util from '../../util';
import BottomSheet from 'react-native-bottomsheet';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function SignupView(props) {
  const {
    isLoading,
    setValue,
    fullName,
    email,
    password,
    phone,
    address,
    retypePwd,
    fullNameError,
    emailError,
    phoneError,
    passwordError,
    retypePwdError,
    addressError,
    genderError,
    handleSubmit,
    hidePassword,
    fullNameFocus,
    emailFocus,
    passwordFocus,
    retypePwdFocus,
    phoneFocus,
    hideRetypePwd,
    termsCheckBox,
    handleAcceptTerms,
    termsError,
    isHelpModalVisible,
    handleDocumentUpload,
    gender,
    documentData,
    documentDataError,
    handleGetAddressData,
    isLangModalVisible,
    handleLanguageModal,
    handleChangeLanguage,
    vehicleOptions,
    vehicle,
    vehicleError,
    handleSelectVehicle,
    vehicleName,
    vehicleNameError,
    numberPlateError,
    numberPlate,
    numberPlateFocus,
    removeDocument,
    referralCode,
    referralCodeError,
    referralCodeFocus,
    visibleDocModal,
    selectedDocIndex,
    isLangLoading,
  } = props;
  console.log({documentData});
  let vehicleLabel = [];
  let images = [];

  vehicleOptions.map((item) => {
    let displayTitle = renderNameStringAndImageRender(item.title);
    vehicleLabel.push(displayTitle);
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      {isLangLoading ? (
        <Loader loading={isLangLoading} />
      ) : (
        <>
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0}}
              colors={Colors.gradient.primary}
              style={styles.bgImage}>
              <View style={styles.loginContent}>
                <Text
                  color={Colors.text.secondary}
                  size={Fonts.size.xxLarge}
                  type="bold">
                  {strings.SIGNUP_NOW}
                </Text>
                <Text
                  color={Colors.text.secondary}
                  size={Fonts.size.xxxSmall}
                  type="light">
                  {strings.PLEASE_FILL_ACCOUNT_AND_CREATE_ACCOUNT}
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.memeSec}>
              <RnImage source={Images.SignupMeme} />
            </View>
            {/* <SignWithSection signup={true} /> */}
            <View style={styles.loginSection}>
              <TextInput
                placeholder={'Khalid Ali'}
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.FULL_NAME.toUpperCase()}
                value={fullName}
                error={fullNameError}
                onChangeText={(val) => {
                  setValue({fullName: val});
                }}
                ref={(ref) => {
                  props.fullNameRef(ref);
                }}
                onSubmitEditing={emailFocus}
              />
              <View style={AppStyles.mTop30}>
                <TextInput
                  placeholder={'abc@gmail.com'}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  autoCapitalize="none"
                  keyboardType={'email-address'}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  label={strings.EMAIL_ID.toUpperCase()}
                  value={email}
                  error={emailError}
                  onChangeText={(val) => {
                    setValue({email: val});
                  }}
                  ref={(ref) => {
                    props.emailRef(ref);
                  }}
                  onSubmitEditing={passwordFocus}
                />
              </View>

              <View style={AppStyles.mTop30}>
                <TextInput
                  placeholder={PASSWORD_PLACEHOLDER}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  label={strings.PASSWORD.toUpperCase()}
                  secureTextEntry={hidePassword}
                  value={password}
                  error={passwordError}
                  onChangeText={(val) => {
                    setValue({password: val});
                  }}
                  ref={(ref) => {
                    props.passRef(ref);
                  }}
                  onSubmitEditing={retypePwdFocus}
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
                <View>
                  <TextInput
                    placeholder={PASSWORD_PLACEHOLDER}
                    placeholderTextColor={Colors.text.quaternary}
                    inputStyle={AppStyles.inputStyle}
                    labelStyle={[
                      AppStyles.labelStyle,
                      util.isRTL() && AppStyles.alignRight,
                    ]}
                    textAlign={util.isRTL() ? 'right' : 'left'}
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
                    // onSubmitEditing={phoneFocus}
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
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={AppStyles.mTop30}>
                <ContactInput
                  onNumberChange={(val, ref) => {
                    setValue({phone: val});
                  }}
                  error={phoneError}
                />
              </View>
              <View style={AppStyles.mTop30}>
                <TextInput
                  placeholder={'ABC1234'}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholderTextColor={Colors.grey1}
                  autoCapitalize="none"
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[AppStyles.labelStyle]}
                  label={strings.REFERRAL_CODE}
                  value={referralCode}
                  error={referralCodeError}
                  onChangeText={(val) => {
                    setValue({referralCode: val});
                  }}
                  ref={(ref) => {
                    props.referralCodeRef(ref);
                  }}
                />
              </View>

              <View style={AppStyles.mTop30}>
                <TextInput
                  placeholder={'street abc, xyz'}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  autoCapitalize="none"
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  label={strings.ADDRESS}
                  error={addressError}
                  ref={(ref) => {
                    props.addressRef(ref);
                  }}
                  value={address.formatted_address}
                  editable={false}
                  onPress={() => {
                    Actions.selectLocationMap({handleGetAddressData});
                  }}
                />
              </View>
            </View>

            <View style={{paddingHorizontal: 47, marginTop: 40}}>
              <TouchableOpacity
                onPress={() => {
                  BottomSheet.showBottomSheetWithOptions(
                    {
                      options: vehicleLabel,
                      cancelButtonIndex: 4, //without this attribute it's not compiling on android
                      dark: false,
                    },
                    (value) => {
                      handleSelectVehicle(vehicleOptions[value]);
                    },
                  );
                }}>
                <View
                  style={[
                    styles.vehicleValueViewWrap,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <Text
                    textAlign={util.rtlRightText()}
                    style={[
                      _.isEmpty(vehicle) ? styles.placeholderStyle : '',
                      styles.vehicleText,
                    ]}>
                    {_.isEmpty(vehicle)
                      ? strings.VEHICLE_TYPE
                      : vehicle.display_name}
                  </Text>
                  <RnImage
                    tintColor={Colors.text.quaternary}
                    style={styles.dropDownIconStyle}
                    source={Images.DownArrowIcon}></RnImage>
                </View>
              </TouchableOpacity>
              <View style={styles.horizontalLineStyle}></View>
              {!_.isEmpty({vehicleError}) && (
                <Text
                  type="medium"
                  size={Fonts.size.xxSmall}
                  color={Colors.error.primary}
                  textAlign={util.rtlRightText()}
                  style={[AppStyles.mTop5, AppStyles.mBottom20]}>
                  {vehicleError}
                </Text>
              )}
            </View>

            {!_.isEmpty(vehicle) &&
              vehicle.name !== 'walk_in' &&
              vehicle.name !== 'bicycle' && (
                <View style={styles.vehicleDetailsHeading}>
                  <Text
                    type="medium"
                    style={[
                      AppStyles.labelStyle,
                      util.isRTL() && AppStyles.alignRight,
                    ]}>
                    {strings.VEHICLE_DETAILS.toUpperCase()}
                  </Text>

                  <View style={[AppStyles.mTop20]}>
                    <TextInput
                      textAlign={util.isRTL() ? 'right' : 'left'}
                      placeholder={strings.ENTER_VEHICLE_NAME}
                      placeholderTextColor={Colors.text.quaternary}
                      inputStyle={AppStyles.inputStyle}
                      labelStyle={[
                        AppStyles.labelStyle,
                        util.isRTL() && AppStyles.alignRight,
                      ]}
                      label={strings.VEHICLE_NAME}
                      value={vehicleName}
                      error={vehicleNameError}
                      onChangeText={(val) => {
                        setValue({vehicleName: val});
                      }}
                      ref={(ref) => {
                        props.vehicleNameRef(ref);
                      }}
                      onSubmitEditing={numberPlateFocus}
                    />
                  </View>
                  <View style={[AppStyles.mTop30]}>
                    <TextInput
                      textAlign={util.isRTL() ? 'right' : 'left'}
                      placeholder={strings.ENTER_NUMBER_PLATE}
                      placeholderTextColor={Colors.text.quaternary}
                      inputStyle={AppStyles.inputStyle}
                      labelStyle={[
                        AppStyles.labelStyle,
                        util.isRTL() && AppStyles.alignRight,
                      ]}
                      label={strings.NUMBER_PLATE}
                      value={numberPlate}
                      error={numberPlateError}
                      onChangeText={(val) => {
                        setValue({numberPlate: val});
                      }}
                      ref={(ref) => {
                        props.numberPlateRef(ref);
                      }}
                    />
                  </View>
                </View>
              )}
            <View style={styles.genderWrap}>
              <View
                style={util.isRTL() ? {position: 'absolute', right: 50} : {}}>
                <Text
                  type="medium"
                  color={Colors.text.penta}
                  style={{backgroundColor: Colors.background}}
                  size={Fonts.size.small}>
                  {strings.GENDER.toUpperCase()}
                </Text>
              </View>

              <View style={styles.genderIconWrap}>
                <TouchableOpacity
                  style={AppStyles.mRight25}
                  onPress={() =>
                    setValue({
                      gender: GENDER_LIST.MALE,
                    })
                  }>
                  <RnImage
                    style={[AppStyles.mBottom10, AppStyles.mRight10]}
                    source={
                      gender == GENDER_LIST.MALE
                        ? Images.SelectedMale
                        : Images.UnSelectedMale
                    }
                  />
                  <Text
                    size={Fonts.size.small}
                    style={AppStyles.mLeft5}
                    type="medium">
                    {strings.MALE}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setValue({
                      gender: GENDER_LIST.FEMALE,
                    })
                  }>
                  <RnImage
                    style={AppStyles.mBottom10}
                    source={
                      gender == GENDER_LIST.FEMALE
                        ? Images.SelectedFemale
                        : Images.UnSelectedFemale
                    }
                  />
                  <Text size={Fonts.size.small} type="medium">
                    {strings.FEMALE}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {!_.isEmpty(genderError) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                style={[
                  AppStyles.mTop25,
                  AppStyles.mBottom5,
                  {textAlign: 'center'},
                ]}>
                {genderError}
              </Text>
            )}
            {/* selected document */}
            <View>
              {documentData.length > 2 && (
                <View
                  style={{
                    // position: 'absolute',
                    marginTop: 20,
                    marginRight: 10,
                    top: 17,
                    right: 0,
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                  }}>
                  <Text
                    removeFontFamily={true}
                    style={{opacity: 0.8, color: '#5D3FD3'}}
                    size={23}
                    type="bold">
                    {'<'}
                  </Text>
                  <Text
                    removeFontFamily={true}
                    style={{opacity: 0.8, color: '#5D3FD3'}}
                    size={23}
                    type="bold">
                    {' >'}
                  </Text>
                </View>
              )}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.documentWrap}>
                {documentData.map((item, index) => {
                  console.log({item});
                  if (item.secure_url.includes('.pdf')) {
                  } else {
                    images.push({
                      url: item.secure_url,
                    });
                  }
                  console.log({index});
                  return (
                    <>
                      {documentData.type === 'application/pdf' ? (
                        <RnImage
                          style={{width: 100, height: 100}}
                          source={Images.PdfIcon}
                        />
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={() => removeDocument(index)}
                            activeOpacity={0.7}
                            style={{
                              backgroundColor: 'red',
                              height: 25,
                              width: 25,
                              borderRadius: 30,
                              alignItems: 'center',
                              justifyContent: 'center',
                              // position: 'absolute',
                              // right: 0,
                              left: 25,
                              zIndex: 999,
                            }}>
                            <Text size={12} type="semiBold">
                              X
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setValue({
                                visibleDocModal: true,
                                selectedDocIndex: index,
                              })
                            }>
                            <RnImage
                              style={styles.documentImg}
                              source={{uri: item.secure_url}}
                            />
                          </TouchableOpacity>
                        </>
                      )}
                    </>
                  );
                })}
              </ScrollView>

              {/* {documentData.length > 2 && (
                <View style={{position: 'absolute', top: 50, right: 0}}>
                  <Text size={35}>{' >'}</Text>
                </View>
              )} */}
            </View>

            {/* {!_.isEmpty(documentData) && (
          <View style={styles.docImage}>
            {documentData.type === 'application/pdf' ? (
              <RnImage
                style={{width: 100, height: 100}}
                source={Images.PdfIcon}
              />
            ) : (
              <RnImage
                style={{width: 100, height: 100}}
                source={{uri: documentData.uri}}
              />
            )}
            <Text
              style={AppStyles.mTop5}
              size={Fonts.size.xxSmall}
              type="medium">
              {documentData.name}
            </Text>
          </View>
        )} */}

            {util.isRTL() ? (
              <View
                style={[
                  styles.btnWrap,
                  styles.paddingHr,
                  AppStyles.flexRow,
                  {left: 15},
                ]}>
                <TouchableOpacity
                  style={[
                    styles.helpIconWrap,
                    {
                      transform: [{rotate: '-180deg'}, {rotateX: '-180deg'}],
                    },
                  ]}
                  onPress={() => {
                    setValue({isHelpModalVisible: true});
                  }}>
                  <RnImage
                    source={Images.HelpIcon}
                    style={{width: 23, height: 23, top: -8}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{marginLeft: 5}}
                  onPress={handleDocumentUpload}>
                  <View style={styles.viewWrap}>
                    <RnImage
                      style={styles.uploadDocImage}
                      source={Images.UploadDocument}
                    />
                    <Text
                      type="semiBold"
                      size={Fonts.size.normal}
                      color={Colors.text.secondary}>
                      {strings.UPLOAD_DOCUMENT}
                      {'  '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[
                  styles.btnWrap,
                  styles.paddingHr,
                  AppStyles.flexRow,
                  {left: 15},
                ]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleDocumentUpload}>
                  <View style={styles.viewWrap}>
                    <RnImage
                      style={styles.uploadDocImage}
                      source={Images.UploadDocument}
                    />
                    <Text
                      type="semiBold"
                      size={Fonts.size.normal}
                      color={Colors.text.secondary}>
                      {'   '}
                      {strings.UPLOAD_DOCUMENT}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.helpIconWrap]}
                  onPress={() => {
                    setValue({isHelpModalVisible: true});
                  }}>
                  <RnImage
                    source={Images.HelpIcon}
                    style={{
                      width: 23,
                      height: 23,
                      top: -8,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
            {util.isRTL() ? (
              <View style={styles.havingProblemSec}>
                <TouchableOpacity onPress={handleDocumentUpload}>
                  <Text size={Fonts.size.xSmall} color={Colors.text.accent}>
                    {strings.TRY_AGAIN}
                  </Text>
                </TouchableOpacity>
                <Text color={Colors.text.quaternary} size={Fonts.size.xSmall}>
                  {strings.HAVING_PROBLEM}{' '}
                </Text>
              </View>
            ) : (
              <View style={styles.havingProblemSec}>
                <Text color={Colors.text.quaternary} size={Fonts.size.xSmall}>
                  {strings.HAVING_PROBLEM}{' '}
                </Text>
                <TouchableOpacity onPress={handleDocumentUpload}>
                  <Text size={Fonts.size.xSmall} color={Colors.text.accent}>
                    {strings.TRY_AGAIN}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View>
              {!_.isEmpty(documentDataError) && (
                <Text
                  type="medium"
                  size={Fonts.size.xxSmall}
                  color={Colors.error.primary}
                  style={[
                    AppStyles.mTop5,
                    AppStyles.mBottom5,
                    {textAlign: 'center'},
                  ]}>
                  {documentDataError}
                </Text>
              )}
            </View>

            <View style={styles.termsSec}>
              {util.isRTL() ? (
                <View style={styles.termWrap}>
                  <Text
                    size={Fonts.size.xxxSmall}
                    color={Colors.text.quaternary}>
                    {
                      strings.BY_CONTINUING_I_CONFIRM_THAT_HAVE_READ_AGREE_TO_THE
                    }
                  </Text>
                  <CheckBox
                    style={AppStyles.mLeft5}
                    disabled={false}
                    value={termsCheckBox}
                    onValueChange={(val) => handleAcceptTerms(val)}
                  />
                </View>
              ) : (
                <View style={styles.termWrap}>
                  <CheckBox
                    style={AppStyles.mRight5}
                    disabled={false}
                    value={termsCheckBox}
                    onValueChange={(val) => handleAcceptTerms(val)}
                  />
                  <Text
                    size={Fonts.size.xxxSmall}
                    color={Colors.text.quaternary}>
                    {
                      strings.BY_CONTINUING_I_CONFIRM_THAT_HAVE_READ_AGREE_TO_THE
                    }
                  </Text>
                </View>
              )}
              <View style={AppStyles.flexRow}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.termsAndCondition();
                  }}>
                  <Text size={Fonts.size.xxxSmall} color={Colors.text.accent}>
                    {strings.TERMS_CONDITIONS}{' '}
                  </Text>
                </TouchableOpacity>
                <Text size={Fonts.size.xxxSmall} color={Colors.text.quaternary}>
                  {strings.AND}
                  {util.isRTL() ? '  ' : ' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Actions.privacyPolicy();
                  }}>
                  <Text size={Fonts.size.xxxSmall} color={Colors.text.accent}>
                    {strings.PRIVACY_POLICY} {util.isRTL() && ' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                style={[AppStyles.mTop10, AppStyles.mBottom5]}>
                {termsError}
              </Text>
            </View>

            <View style={[styles.loginBtnWrap, styles.paddingHr]}>
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
                  {strings.SIGNUP.toUpperCase()}
                </Button>
              </LinearGradient>
            </View>
            {util.isRTL() ? (
              <View style={styles.signupSec}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.reset('login');
                  }}>
                  <Text size={Fonts.size.xSmall} color={Colors.text.accent}>
                    {strings.LOGIN}
                  </Text>
                </TouchableOpacity>
                <Text color={Colors.text.quaternary} size={Fonts.size.xSmall}>
                  {`${strings.ALREADY_HAVE_ACCOUNT} ${
                    util.isRTL() ? '؟ ' : '? '
                  }`}
                </Text>
              </View>
            ) : (
              <View style={styles.signupSec}>
                <Text color={Colors.text.quaternary} size={Fonts.size.xSmall}>
                  {`${strings.ALREADY_HAVE_ACCOUNT} ${
                    util.isRTL() ? '؟ ' : '? '
                  }`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Actions.reset('login');
                  }}>
                  <Text size={Fonts.size.xSmall} color={Colors.text.accent}>
                    {strings.LOGIN}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
        </>
      )}

      {isLangModalVisible && (
        <SelectLanguageModal
          isModalOpen={isLangModalVisible}
          closeModal={setValue}
          modalType="isLangModalVisible"
          handleLangSelect={handleChangeLanguage}
        />
      )}

      {isHelpModalVisible && (
        <Modal
          isVisible={isHelpModalVisible}
          style={styles.modal}
          onBackButtonPress={() => setValue({isHelpModalVisible: false})}
          onBackdropPress={() => setValue({isHelpModalVisible: false})}>
          <View style={styles.modalWrap}>
            <Text
              style={styles.text}
              size={Fonts.size.xxSmall}
              color={Colors.text.secondary}>
              {strings.HELP_INFO_DRIVER}
            </Text>
          </View>
        </Modal>
      )}
      {visibleDocModal && (
        <Modal
          style={{padding: 0, margin: 0}}
          onBackButtonPress={() => setValue({visibleDocModal: false})}
          onBackdropPress={() => setValue({visibleDocModal: false})}
          visible={visibleDocModal}
          transparent={true}>
          <ImageViewer
            onSwipeDown={() => setValue({visibleDocModal: false})}
            index={selectedDocIndex}
            imageUrls={images}
            enableSwipeDown={true}
            swipeDownThreshold={12}
          />
        </Modal>
      )}
    </KeyboardAwareScrollView>
  );
}
