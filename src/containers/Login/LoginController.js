import React from 'react';
import {Keyboard} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import util from '../../util';
import {RIDER_TYPE, strings, ZONE_OPTIONS} from '../../constants';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import {customStatusBar} from '../../services/GeneralHelper';
import {changeLanguageSuccess} from '../../actions/GeneralActions';
import {Actions} from 'react-native-router-flux';
import {userSigninRequest, rememberMe} from '../../actions/UserActions';
// import {initNotifications} from '../../helpers/firebaseHelper';

class LoginController extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      password: '',
      userIdError: '',
      passwordError: '',
      hidePassword: true,
      stayLogged: false,
      isLoading: false,
      isLangModalVisible: false,
    };
  }

  static propTypes = {language: PropTypes.string.isRequired};
  static defaultProps = {};

  componentDidMount() {
    customStatusBar();
    this.initial();
  }

  initial = () => {
    // check is user credentials save then fill in field
    const {credentials} = this.props;
    if (!_.isEmpty(credentials)) {
      this.setState({
        userId: credentials.userId,
        password: credentials.password,
        stayLogged: true,
      });
    }
  };

  handleShowPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };

  // get value from field and save into states
  setValue = (key) => {
    this.setState(key);
  };

  //  focus on fields
  userIdFocus = () => {
    this.userIdRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };

  handleStayLogged = () => {
    this.setState({
      stayLogged: !this.state.stayLogged,
    });
  };

  // validation all login fields
  validation = () => {
    const {userId, password, userIdError, passwordError} = this.state;
    let error = true;
    if (_.isEmpty(userId)) {
      this.setState({
        userIdError: strings.USER_ID_IS_REQ,
        // util.isRequiredErrorMessage(strings.USER_ID),
      });
      this.userIdFocus();
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
    }

    if (_.isEmpty(userId) && _.isEmpty(password)) {
      this.userIdFocus();
    }

    return error;
  };

  handleSubmit = () => {
    Keyboard.dismiss();

    // clear all error msg
    this.setState({
      userIdError: '',
      passwordError: '',
    });

    // if validation pass
    if (this.validation()) {
      const {userId, password} = this.state;
      const {language} = this.props;

      const payload = {
        driver_id: userId,
        password: password,
        language,
      };

      // here i am check if user remember me then save user credtionl
      this.handleRemember();

      // start loader
      this.setState({isLoading: true});
      this.props.userSigninRequest(payload, (status) => {
        // stop loader
        this.setState({isLoading: false});
        if (status) {
          // initNotifications();
          // if user not approve bya admin then take to user on wainting screen
          console.log({selectde: this.props.user.is_zone_selected});
          if (
            !this.props.user.is_approved &&
            RIDER_TYPE.WASPHA_EXPRESS === this.props.user.type
          ) {
            return Actions.replace('waiting');
          } else if (
            !this.props.user.is_zone_selected &&
            RIDER_TYPE.WASPHA_EXPRESS === this.props.user.type
          ) {
            if (this.props.user.zone_option === ZONE_OPTIONS.FIXED_ZONE) {
              Actions.reset('drawerMenu');
              Actions.refresh({fromZoneOptions: true});
            } else if (this.props.user.zone_option === ZONE_OPTIONS.FREE_ZONE) {
              Actions.reset('drawerMenu');
            } else {
              return Actions.reset('zoneOptions');
            }
          } else {
            Actions.reset('drawerMenu');
          }
        }
      });
    }
  };

  handleChangeLanguage = (lang) => {
    const {changeLanguageSuccess} = this.props;
    util.updateLocale(lang);

    util.switchLanguage(lang);
    changeLanguageSuccess(lang);
    this.setState({isLangModalVisible: false});
  };
  handleLanguageModal = () => {
    this.setState({
      isLangModalVisible: true,
    });
  };

  // here i am check if user remember me then save user credentials
  handleRemember = () => {
    const {stayLogged, userId, password} = this.state;
    if (stayLogged) {
      const payload = {
        userId,
        password,
      };
      this.props.rememberMe(payload);
    } else {
      this.props.rememberMe({});
    }
  };

  render() {
    const {
      userId,
      password,
      userIdError,
      passwordError,
      hidePassword,
      stayLogged,
      isLoading,
      isLangModalVisible,
    } = this.state;
    return (
      <LoginView
        {...this.props}
        isLoading={isLoading}
        setValue={this.setValue}
        userId={userId}
        password={password}
        userIdError={userIdError}
        passwordError={passwordError}
        handleSubmit={this.handleSubmit}
        isLangModalVisible={isLangModalVisible}
        passwordFocus={this.passwordFocus}
        hidePassword={hidePassword}
        handleShowPassword={this.handleShowPassword}
        stayLogged={stayLogged}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        handleStayLogged={this.handleStayLogged}
        userIdRef={(ref) => {
          this.userIdRef = ref;
        }}
        passRef={(ref) => {
          this.passRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  credentials: user.credentials,
  user: user.data,
  language: general.appLanguage,
});

const actions = {rememberMe, userSigninRequest, changeLanguageSuccess};

export default connect(mapStateToProps, actions)(LoginController);
