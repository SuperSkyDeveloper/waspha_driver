import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VerificationCodeView from './VerificationCodeView';
import {connect} from 'react-redux';
import util from '../../util';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {RESEND_CODE_TIMER, strings} from '../../constants';
import {
  forgotPasswordRequest,
  userConfirmOptRequest,
  resendOtpRequest,
  verifyResetPasswordRequest,
  userSignupRequest,
  changeEmailOrPhoneOTPRequest,
  changeEmailOrPhoneRequest,
} from '../../actions/UserActions';
import {Keyboard} from 'react-native';
import {alertMessage} from '../../actions/GeneralActions';

class VerificationCodeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpCode: '',
      otpCodeError: '',
      editModalVisible: false,
      verificationAccount: '',
      verificationAccountError: '',
      isLoading: false,
      editAccount: '',
      editAccountError: '',
      editAccountLoader: false,
      disableResendOTP: true,
      otpExpireTime: RESEND_CODE_TIMER,
      resetCountdownId: Math.random(),
      resendCodeLoading: false,
      dataFromProfile: props.profilePayload,
    };
  }
  static propTypes = {
    isForgetPassword: PropTypes.bool,
    fromSignUp: PropTypes.bool,
    userId: PropTypes.string,
    incomingData: PropTypes.object,
    fromProfile: PropTypes.bool,
    profilePayload: PropTypes.any,
  };
  static defaultProps = {
    isForgetPassword: false,
    fromSignUp: false,
    userId: '',
    incomingData: {},
    fromProfile: false,
  };

  componentDidMount() {
    customStatusBar();

    this.setState({
      verificationAccount: this.props.userId,
    });
  }

  setValue = (key) => {
    this.setState(key);
  };
  // validation
  validation = () => {
    const {otpCode, otpCodeError} = this.state;

    if (_.isEmpty(otpCode)) {
      this.setState({
        otpCodeError: strings.CODE_IS_REQ,
        //util.isRequiredErrorMessage(strings.CODE),
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    const {changeEmailOrPhoneOTPRequest} = this.props;
    const {dataFromProfile} = this.state;
    // if verification pass
    if (this.validation()) {
      this.setState({
        isLoading: true,
      });
      if (this.props.isForgetPassword) {
        const payload = {
          user_id: this.props.incomingData.user_id,
          otp: this.state.otpCode,
        };

        this.props.verifyResetPasswordRequest(payload, (status) => {
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.reset('passwordRecovery', {
              userId: this.state.verificationAccount,
              incomingData: this.props.incomingData.user_id,
            });
          }
        });
      } else if (this.props.fromProfile) {
        const payload = {
          user_id: dataFromProfile.user_id,
          otp: this.state.otpCode,
        };
        changeEmailOrPhoneOTPRequest(payload, (response) => {
          if (response) {
            this.setState({isLoading: false});
            Actions.popTo('profile');
          }
          this.setState({isLoading: false});
        });
      } else {
        const payload = {
          user_id: this.state.verificationAccount,
          otp: this.state.otpCode,
        };
        this.props.userConfirmOptRequest(payload, (status) => {
          this.setState({
            isLoading: false,
          });
          if (status) {
            Actions.replace('waiting');
          }
        });
      }
    }
  };

  // handleModal = () => {
  //   if (_.isEmpty(this.state.verificationAccount)) {
  //     this.setState({
  //       verificationAccountError: util.isRequiredErrorMessage(
  //         strings.CONTACT_NUMBER,
  //       ),
  //     });
  //     return true;
  //   }
  //   this.setState({
  //     editModalVisible: !this.state.editModalVisible,
  //   });
  // };

  // validation for edit account
  handleEditAccountValidate = () => {
    let error = true;
    const {editAccount} = this.state;

    if (_.isEmpty(editAccount.number)) {
      this.setState({
        editAccountError: strings.PHONE_NUM_IS_REQ,
        //util.isRequiredErrorMessage(strings.PHONE),
      });
      error = false;
    } else if (
      !util.isNumber(editAccount.number) ||
      !editAccount.isNumberValid
    ) {
      this.setState({
        editAccountError: strings.ENTER_VALID_NUMBER,
      });
      error = false;
    }
    return error;
  };

  // handle edit done
  handleEditDone = () => {
    // clear error
    this.setState({
      editAccountError: '',
    });
    // validation

    if (this.handleEditAccountValidate()) {
      // start loader
      this.setState({
        editAccountLoader: true,
      });
      const {editAccount} = this.state;
      let temp = _.cloneDeep(this.props.signupUserData);
      temp.contact = editAccount;

      const payload = temp;

      this.props.userSignupRequest(payload, (status) => {
        //  stop loading
        this.setState({
          editAccountLoader: false,
        });
        if (status) {
          //  close modal
          this.setState({
            editModalVisible: false,
            verificationAccount: editAccount,
          });
        }
      });
    }
  };

  // handle reset password
  handleResetOTP = () => {
    const {alertMessage, fromProfile, changeEmailOrPhoneRequest} = this.props;
    const {dataFromProfile} = this.state;
    // start loading
    this.setState({
      resendCodeLoading: true,
    });
    // hide keyboard
    Keyboard.dismiss();

    // if user come from forget password flow
    if (this.props.isForgetPassword) {
      const payload = {
        user_id: this.props.incomingData.user_id,
      };

      this.props.forgotPasswordRequest(payload, (status) => {
        this.setState({
          resendCodeLoading: false,
        });
        if (status) {
          this.setState({
            disableResendOTP: true,
            resetCountdownId: Math.random(),
          });

          // clear code
          this.otpRef.clear();
          // util.topAlert(strings.CODE_SEND_SUCCESSFULLY);
          alertMessage(strings.CODE_SEND_SUCCESSFULLY);
        }
      });
    } else if (fromProfile) {
      const payload = {
        user_id: dataFromProfile.user_id,
      };
      changeEmailOrPhoneRequest(payload, (response) => {
        //stop loading
        this.setState({
          resendCodeLoading: false,
          otpCode: '',
        });

        if (response.status) {
          // clear code
          this.setState({
            disableResendOTP: true,
            resetCountdownId: Math.random(),
          });

          this.otpRef.clear();
          // util.topAlert(strings.CODE_SEND_SUCCESSFULLY);
          alertMessage(strings.CODE_SEND_SUCCESSFULLY);
        }
      });
    } else {
      const payload = {
        user_id: this.state.verificationAccount,
      };
      this.props.resendOtpRequest(payload, (status) => {
        this.setState({
          resendCodeLoading: false,
          otpCode: '',
        });

        if (status) {
          // clear code
          this.setState({
            disableResendOTP: true,
            resetCountdownId: Math.random(),
          });

          this.otpRef.clear();
          // util.topAlert(strings.CODE_SEND_SUCCESSFULLY);
          alertMessage(strings.CODE_SEND_SUCCESSFULLY);
        }
      });
    }
  };

  render() {
    const {
      otpCode,
      otpCodeError,
      editModalVisible,
      verificationAccount,
      verificationAccountError,
      isLoading,
      editAccount,
      editAccountError,
      editAccountLoader,
      otpExpireTime,
      resetCountdownId,
      disableResendOTP,
      resendCodeLoading,
      dataFromProfile,
    } = this.state;
    return (
      <VerificationCodeView
        {...this.props}
        editAccountLoader={editAccountLoader}
        editAccount={editAccount}
        editAccountError={editAccountError}
        handleResend={this.handleResend}
        isLoading={isLoading}
        verificationAccount={verificationAccount}
        verificationAccountError={verificationAccountError}
        otpCode={otpCode}
        otpCodeError={otpCodeError}
        dataFromProfile={dataFromProfile}
        handleModal={this.handleModal}
        editModalVisible={editModalVisible}
        otpExpireTime={otpExpireTime}
        resetCountdownId={resetCountdownId}
        disableResendOTP={disableResendOTP}
        resendCodeLoading={resendCodeLoading}
        handleEditDone={this.handleEditDone}
        handleSubmit={this.handleSubmit}
        handleResetOTP={this.handleResetOTP}
        setValue={(data) => this.setValue(data)}
        otpRef={(ref) => {
          this.otpRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  otp: user.data.otp,
  userData: user.data,
});

const actions = {
  userConfirmOptRequest,
  forgotPasswordRequest,
  resendOtpRequest,
  userSignupRequest,
  verifyResetPasswordRequest,
  alertMessage,
  changeEmailOrPhoneOTPRequest,
  changeEmailOrPhoneRequest,
};

export default connect(mapStateToProps, actions)(VerificationCodeController);
