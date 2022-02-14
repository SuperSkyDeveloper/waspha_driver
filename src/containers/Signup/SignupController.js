import React from 'react';
import _ from 'lodash';
import DocumentPicker from 'react-native-document-picker';
import {connect} from 'react-redux';
import util from '../../util';
import {GENDER_LIST, strings} from '../../constants';
import PropTypes from 'prop-types';
import SignupView from './SignupView';
import ImgToBase64 from 'react-native-image-base64';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {
  uploadDocumentsRequest,
  userSignupRequest,
} from '../../actions/UserActions';
import {Keyboard} from 'react-native';
import {
  alertMessage,
  changeLanguageSuccess,
} from '../../actions/GeneralActions';

class SignupController extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      password: '',
      retypePwd: '',
      phone: '',
      address: '',
      gender: '',
      fullNameError: '',
      passwordError: '',
      emailError: '',
      retypePwdError: '',
      phoneError: '',
      addressError: '',
      genderError: '',
      hidePassword: true,
      hideRetypePwd: true,
      termsCheckBox: false,
      isHelpModalVisible: false,
      termsError: '',
      documentData: [],
      documentDataError: '',
      isLoading: false,
      isLangModalVisible: false,
      vehicleError: '',
      vehicle: '',

      vehicleName: '',
      vehicleNameError: '',
      numberPlateError: '',

      numberPlate: '',
      referralCodeError: '',
      referralCode: '',
      visibleDocModal: false,
      selectedDocIndex: 0,
      isLangLoading: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
  }

  handleChangeLanguage = (lang) => {
    console.warn('handleChangeLanguage');

    this.setState({isLangLoading: true});

    const {changeLanguageSuccess} = this.props;
    util.switchLanguage(lang);
    util.updateLocale(lang);

    changeLanguageSuccess(lang);

    setTimeout(() => {
      this.setState({isLangModalVisible: false, isLangLoading: false});
    }, 200);
  };
  handleLanguageModal = () => {
    this.setState({
      isLangModalVisible: true,
    });
  };

  // get value from field and save into states
  setValue = (key) => {
    this.setState(key);
  };

  //  focus on fields
  fullNameFocus = () => {
    this.fullNameRef.focus();
  };

  emailFocus = () => {
    this.emailRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };
  retypePwdFocus = () => {
    this.retypePwdRef.focus();
  };

  referralCodeFocus = () => {
    this.referralCodeRef.focus();
  };
  phoneFocus = () => {
    this.phoneRef.focus();
  };

  addressFocus = () => {
    this.addressRef.focus();
  };

  numberPlateFocus = () => {
    this.numberPlateRef.focus();
  };

  vehicleNameFocus = () => {
    this.vehicleNameRef.focus();
  };

  // handle terms checkbox
  handleAcceptTerms = () => {
    this.setState({
      termsCheckBox: !this.state.termsCheckBox,
    });
  };

  // validation all login fields
  validation = () => {
    const {
      fullName,
      email,
      password,
      retypePwd,
      phone,
      address,
      termsCheckBox,
      phoneError,
      fullNameError,
      passwordError,
      emailError,
      retypePwdError,
      documentData,
      gender,
      vehicle,
      vehicleName,
      numberPlate,
    } = this.state;

    let error = true;

    if (!termsCheckBox) {
      this.setState({
        termsError: strings.PLEASE_ACCEPT_OUR_TERMS_AND_CONDITIONS,
      });
      error = false;
    }

    if (_.isEmpty(documentData)) {
      this.setState({
        documentDataError: strings.DOCUMENT_IS_REQ,
        //  util.isRequiredErrorMessage(strings.DOCUMENT),
      });
      error = false;
    }

    if (_.isEmpty(gender)) {
      this.setState({
        genderError: strings.GENDER_IS_REQ,
        // util.isRequiredErrorMessage(strings.GENDER),
      });
      error = false;
    }

    if (
      !_.isEmpty(vehicle) &&
      vehicle.name !== 'walk_in' &&
      vehicle.name !== 'bicycle'
    ) {
      if (_.isEmpty(numberPlate)) {
        this.setState({
          numberPlateError: strings.NUMBER_PLATE_IS_REQ,
          // util.isRequiredErrorMessage(strings.NUMBER_PLATE),
        });
        this.numberPlateFocus();
        error = false;
      }
      if (_.isEmpty(vehicleName)) {
        this.setState({
          vehicleNameError: strings.VEHICLE_NAME_IS_REQ,
          // util.isRequiredErrorMessage(strings.VEHICLE_NAME),
        });
        this.vehicleNameFocus();
        error = false;
      }
    }

    if (_.isEmpty(vehicle)) {
      this.setState({
        vehicleError: strings.VEHICLE_IS_REQ,
        // util.isRequiredErrorMessage(strings.VEHICLE),
      });
      error = false;
    }

    if (_.isEmpty(address)) {
      this.setState({
        addressError: strings.ADDRESS_IS_REQ.toLowerCase(),
        //  util.isRequiredErrorMessage(
        //   strings.ADDRESS.toLowerCase(),
        // ),
      });
      this.addressFocus();
      error = false;
    }

    if (_.isEmpty(phone)) {
      this.setState({
        phoneError: strings.PHONE_NUMBER_IS_REQ,
        // util.isRequiredErrorMessage(strings.PHONE_NUMBER),
      });
      // this.phoneFocus();
      error = false;
    } else if (!phone.isNumberValid) {
      this.setState({
        phoneError: strings.ENTER_VALID_NUMBER,
      });
      // this.phoneFocus();
      error = false;
    }

    if (_.isEmpty(retypePwd)) {
      this.setState({
        retypePwdError: strings.RETYPE_PASSWORD_IS_REQ,
        // util.isRequiredErrorMessage(strings.RETYPE_PASSWORD),
      });
      this.retypePwdFocus();
      error = false;
    } else if (retypePwd !== password) {
      this.setState({retypePwdError: strings.PASSWORD_NOT_MATCH});
      this.retypePwdFocus();
      error = false;
    }

    if (_.isEmpty(password)) {
      this.setState({
        passwordError: strings.PASSWORD_IS_REQ,
        //util.isRequiredErrorMessage(strings.PASSWORD),
      });
      this.passwordFocus();
      error = false;
    } else if (!util.isPasswordValid(password)) {
      this.setState({passwordError: strings.PASSWORD_LENGTH});
      this.passwordFocus();
      error = false;
    } else if (!util.isStrongPassword(password)) {
      this.setState({
        passwordError:
          strings.PASSWORD_CONTAIN_ONE_CAPITAL_LETTER_AND_ONE_NUMBER,
      });
      this.passwordFocus();
      error = false;
    }

    if (_.isEmpty(email)) {
      this.setState({
        emailError: strings.EMAIL_IS_REQ,
        //util.isRequiredErrorMessage(strings.EMAIL)
      });
      this.emailFocus();
      error = false;
    } else if (!util.isEmailValid(email)) {
      this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
      this.emailFocus();
      error = false;
    }

    if (_.isEmpty(fullName)) {
      this.setState({
        fullNameError: strings.FULL_NAME_IS_REQ,
        //util.isRequiredErrorMessage(strings.FULL_NAME),
      });
      this.fullNameFocus();
      error = false;
    }

    return error;
  };

  setValue = (key) => {
    this.setState(key);
  };

  // document picker
  handleDocumentUpload = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        readContent: true,
      });
      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size,
      // );

      // console.log({res});
      // res.forEach(async (file) => {
      //   await this.uploadImage({
      //     uri: file.uri,
      //     type: file.type,
      //     name: file.name,
      //   });
      // });

      // this.setState({documentData: res, isDocumentError: false});
      this.uploadImage(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        this.setState({
          isDocumentError: true,
        });
        // throw err;
      }
    }
  };

  // todo improve
  // purpose not find any solution for multiple image upload
  uploadImage = (allImages) => {
    const {alertMessage} = this.props;
    const url = 'https://api.cloudinary.com/v1_1/waspha/upload';
    const formData = new FormData();

    for (let i = 0; i < allImages.length; i++) {
      let file = allImages[i];
      formData.append('tags', 'mobile_upload'); // Optional - add tag for image admin in Cloudinary
      formData.append('upload_preset', 'waspha');
      formData.append('file', file);
      formData.append('api_key', '939551625298936');

      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          let imageData = _.cloneDeep(this.state.documentData);
          imageData.push(data);
          this.setState({documentData: imageData, isDocumentError: false});
        })
        .catch((err) => {
          // util.topAlert('An Error Occured While Uploading');
          alertMessage('An Error Occured While Uploading');
        });
    }
  };

  uploadImage1 = async (images) => {
    await images.forEach((image) => {
      const imageFormData = new FormData();
      imageFormData.append('tags', 'mobile_upload'); // Optional - add tag for image admin in Cloudinary
      imageFormData.append('upload_preset', 'waspha');
      imageFormData.append('file', image);
      imageFormData.append('api_key', '939551625298936');

      this.props.uploadDocumentsRequest(
        imageFormData,
        (status, newImage = {}) => {
          if (status) {
            const cloudImage = {
              public_id: newImage.public_id,
              version: newImage.version,
              height: newImage.height,
              width: newImage.width,
              format: newImage.format,
              bytes: newImage.bytes,
              url: newImage.url,
              secure_url: newImage.secure_url,
            };

            // const payload = {};
            // payload.image = cloudImage;
            // this.props.userUpdateProfileRequest(payload, () => {
            //   util.hideLoader(this);
            // });
          } else {
            util.hideLoader(this);
          }
        },
      );
    });
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      fullNameError: '',
      passwordError: '',
      emailError: '',
      retypePwdError: '',
      termsError: '',
      phoneError: '',
      addressError: '',
      genderError: '',
      documentDataError: '',
      vehicleError: '',
      vehicleNameError: '',
      numberPlateError: '',
      referralCodeError: '',
    });

    // if validation pass
    if (this.validation()) {
      // start loading
      this.setState({
        isLoading: true,
      });
      const {
        fullName,
        email,
        password,
        phone,
        address,
        gender,
        documentData,
        vehicle,
        vehicleName,
        numberPlate,
        referralCode,
      } = this.state;
      const {language} = this.props;

      let docUrl = [];
      documentData.map((data) => {
        docUrl.push(data.url);
      });
      console.log({docUrl});

      const payload = {
        name: fullName,
        email,
        password,
        contact: phone,
        location: {
          address: address.formatted_address,
          lat: address.latitude,
          lng: address.longitude,
        },
        gender,
        document: docUrl,
        language,
        vehicle_id: vehicle.id,
        vehicle_name: vehicleName,
        number_plate: numberPlate,
        referral_code: referralCode,
      };

      if (_.isEmpty(referralCode)) {
        delete payload['referral_code'];
      }

      if (vehicle.name === 'walk_in' || vehicle.name === 'bicycle') {
        delete payload['number_plate'];
        delete payload['vehicle_name'];
      }

      this.props.userSignupRequest(payload, (status) => {
        Keyboard.dismiss();
        // stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          Actions.verificationCode({
            fromSignUp: true,
            userId: phone,
            signupUserData: payload,
          });
        }
      });
    }
  };

  // handle get address data
  handleGetAddressData = (address) => {
    this.setValue({
      address,
    });
  };

  handleSelectVehicle = (vehicle) => {
    console.warn(vehicle);
    this.setState({vehicle});
  };

  removeDocument = (index) => {
    let data = _.cloneDeep(this.state.documentData);
    data.splice(index, 1);

    this.setState({documentData: data});
  };

  render() {
    const {
      fullName,
      password,
      phone,
      address,
      fullNameError,
      passwordError,
      phoneError,
      emailError,
      addressError,
      retypePwdError,
      hidePassword,
      hideRetypePwd,
      termsCheckBox,
      termsError,
      genderError,
      isHelpModalVisible,
      gender,
      documentData,
      documentDataError,
      isLoading,
      isLangModalVisible,
      vehicle,
      vehicleError,

      vehicleName,
      vehicleNameError,
      numberPlateError,
      numberPlate,
      referralCode,
      referralCodeError,
      visibleDocModal,
      selectedDocIndex,
      isLangLoading,
    } = this.state;
    return (
      <SignupView
        {...this.props}
        isLoading={isLoading}
        documentData={documentData}
        documentDataError={documentDataError}
        gender={gender}
        phoneFocus
        fullName={fullName}
        password={password}
        phone={phone}
        address={address}
        isHelpModalVisible={isHelpModalVisible}
        fullNameError={fullNameError}
        passwordError={passwordError}
        emailError={emailError}
        phoneError={phoneError}
        addressError={addressError}
        genderError={genderError}
        vehicle={vehicle}
        vehicleError={vehicleError}
        hidePassword={hidePassword}
        hideRetypePwd={hideRetypePwd}
        vehicleName={vehicleName}
        vehicleNameError={vehicleNameError}
        numberPlate={numberPlate}
        numberPlateError={numberPlateError}
        termsError={termsError}
        termsCheckBox={termsCheckBox}
        isLangModalVisible={isLangModalVisible}
        retypePwdError={retypePwdError}
        visibleDocModal={visibleDocModal}
        selectedDocIndex={selectedDocIndex}
        isLangLoading={isLangLoading}
        handleGetAddressData={this.handleGetAddressData}
        handleDocumentUpload={this.handleDocumentUpload}
        setValue={this.setValue}
        removeDocument={this.removeDocument}
        fullNameFocus={this.fullNameFocus}
        emailFocus={this.emailFocus}
        passwordFocus={this.passwordFocus}
        retypePwdFocus={this.retypePwdFocus}
        numberPlateFocus={this.numberPlateFocus}
        vehicleNameFocus={this.vehicleNameFocus}
        phoneFocus={this.phoneFocus}
        handleAcceptTerms={this.handleAcceptTerms}
        handleSubmit={this.handleSubmit}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        handleSelectVehicle={this.handleSelectVehicle}
        referralCode={referralCode}
        referralCodeError={referralCodeError}
        referralCodeFocus={this.referralCodeFocus}
        fullNameRef={(ref) => {
          this.fullNameRef = ref;
        }}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        passRef={(ref) => {
          this.passRef = ref;
        }}
        retypePwdRef={(ref) => {
          this.retypePwdRef = ref;
        }}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
        addressRef={(ref) => {
          this.addressRef = ref;
        }}
        numberPlateRef={(ref) => {
          this.numberPlateRef = ref;
        }}
        vehicleNameRef={(ref) => {
          this.vehicleNameRef = ref;
        }}
        referralCodeRef={(ref) => {
          this.referralCodeRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  language: general.appLanguage,
  vehicleOptions: general.appSetting.delivery_vehicles,
});

const actions = {
  userSignupRequest,
  uploadDocumentsRequest,
  alertMessage,
  changeLanguageSuccess,
};

export default connect(mapStateToProps, actions)(SignupController);
