import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ForgetPasswordView from './ForgetPasswordView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings, FORGET_OPTION} from '../../constants';
import {customStatusBar} from '../../services/GeneralHelper';
import {Actions} from 'react-native-router-flux';
import {forgotPasswordRequest} from '../../actions/UserActions';
import {Keyboard} from 'react-native';

class ForgetPasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      emailError: '',
      phoneError: '',
      phoneNumObj: {},

      selectForgetOpt: FORGET_OPTION.EMAIL,
      isLoader: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
  }

  setValue = (key) => {
    this.setState(key);
  };

  emailFocus = () => {
    this.emailRef.focus();
  };
  phoneFocus = () => {
    this.phoneRef.focus();
  };

  // validation all login fields
  validation = () => {
    const {email, phone, emailError, phoneError, selectForgetOpt} = this.state;

    let error = true;
    if (selectForgetOpt === FORGET_OPTION.EMAIL) {
      if (_.isEmpty(email)) {
        this.setState({
          emailError: strings.EMAIL_IS_REQ,
          //util.isRequiredErrorMessage('Email')
        });
        this.emailFocus();
        error = false;
      } else if (!util.isEmailValid(email)) {
        this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
        this.emailFocus();
        error = false;
      }
      return error;
    }

    if (selectForgetOpt === FORGET_OPTION.PH0NE) {
      if (_.isEmpty(phone)) {
        this.setState({
          phoneError: strings.PHONE_NUM_IS_REQ,
          //util.isRequiredErrorMessage('Contact No'),
        });
        // this.phoneFocus();
        return false;
      } else if (phone === 'invalid') {
        this.setState({
          phoneError: strings.ENTER_VALID_NUMBER,
        });
        // this.phoneFocus();
        return false;
      }
      return true;
    }
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      emailError: '',
      phoneError: '',
    });
    // if validation pass
    if (this.validation()) {
      // hide keyboard
      Keyboard.dismiss();
      // start loading
      this.setState({
        isLoader: true,
      });

      const {email, phone, phoneNumObj, selectForgetOpt} = this.state;
      const {country_code, number, phone_number} = phoneNumObj;

      let payload = {};
      if (selectForgetOpt === FORGET_OPTION.PH0NE) {
        payload = {
          user_id: {
            country_code,
            phone_number,
            number,
          },
        };
      } else {
        payload = {
          user_id: email,
        };
      }
      this.props.forgotPasswordRequest(payload, (res) => {
        // stop loading
        this.setState({
          isLoader: false,
        });
        if (res.status) {
          const incomingData = {
            user_id: payload.user_id,
            otp: res.data.otp,
          };
          Actions.verificationCode({
            isForgetPassword: true,
            userId:
              selectForgetOpt === FORGET_OPTION.PH0NE
                ? payload.user_id.phone_number
                : payload.user_id,
            otp: res.data.otp,
            incomingData: incomingData,
          });
        }
      });
    }
  };

  render() {
    const {
      otpCode,
      emailError,
      selectForgetOpt,
      email,
      phone,
      phoneError,
      isLoader,
    } = this.state;
    return (
      <ForgetPasswordView
        {...this.props}
        otpCode={otpCode}
        handleSubmit={this.handleSubmit}
        setValue={this.setValue}
        email={email}
        isLoader={isLoader}
        phone={phone}
        emailError={emailError}
        phoneError={phoneError}
        selectForgetOpt={selectForgetOpt}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
        setPhone={(phone, isValid, phoneNumObj) => {
          isValid
            ? this.setState({phone, phoneNumObj})
            : this.setState({phone: 'invalid'});
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {forgotPasswordRequest};

export default connect(mapStateToProps, actions)(ForgetPasswordController);
