import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import VerificationCodeModalView from './VerificationCodeModalView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';

class VerificationCodeModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalType: PropTypes.string,
    handleOnPress: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},
    modalType: '',
  };

  setValue = (key) => {
    this.setState(key);
  };

  otpFocus = () => {
    this.otpRef.focus();
  };

  validation = () => {
    return true;
  };

  handleSubmit = () => {
    // if verification pass
    const {closeModal, modalType} = this.props;
    if (this.validation()) {
      // Actions.confirmScreen({fromVerification: true});
      this.props.handleOnPress();
      closeModal({[modalType]: false});
    }
  };

  render() {
    return (
      <VerificationCodeModalView
        handleSubmit={this.handleSubmit}
        otpRef={(ref) => {
          this.otpRef = ref;
        }}
        setValue={(data) => this.setValue(data)}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({requests}) => ({
  request: requests.requests[0],
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(VerificationCodeModalController);
