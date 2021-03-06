import React from 'react';
import PropTypes from 'prop-types';
import ContactUsView from './ContactUsView';
import util from '../../util';
import {strings} from '../../constants';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {contactUsRequest} from '../../actions/GeneralActions';
import {Keyboard} from 'react-native';
const refSubject = React.createRef();
const refMessage = React.createRef();
class ContactUsController extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      message: '',
      subjectError: '',
      messageError: '',
      confirmModal: false,
      isLoading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  setValue = (key) => {
    this.setState(key);
  };

  subjectFocus = () => {
    this.subjectRef.focus();
  };

  messageFocus = () => {
    this.messageRef.focus();
  };

  validation = () => {
    const {subject, message} = this.state;
    let error = true;

    if (_.isEmpty(message)) {
      this.setState({
        messageError: strings.MESSAGE_IS_REQ,
        // util.isRequiredErrorMessage(strings.MESSAGE),
      });
      this.messageFocus();
      error = false;
    }

    if (_.isEmpty(subject)) {
      this.setState({
        subjectError: strings.SUBJECT_IS_REQ,
        // util.isRequiredErrorMessage(strings.SUBJECT),
      });
      this.subjectFocus();
      error = false;
    }
    return error;
  };

  handleSubmitPress = () => {
    // clear error
    this.setState({
      messageError: '',
      subjectError: '',
    });

    if (this.validation()) {
      // start loading
      this.setState({
        isLoading: true,
      });

      Keyboard.dismiss();
      const {subject, message} = this.state;
      const payload = {
        subject,
        message,
      };

      this.props.contactUsRequest(payload, (status) => {
        // stop loading
        this.setState({
          isLoading: false,
        });

        if (status) {
          // this.subjectFocus();

          // clear all field
          this.setState({
            message: '',
            subject: '',
          });
        }
      });
    }
  };

  render() {
    const {
      subjectError,
      messageError,
      subject,
      message,
      confirmModal,
      isLoading,
    } = this.state;
    return (
      <ContactUsView
        isLoading={isLoading}
        subject={subject}
        message={message}
        subjectRef={(ref) => {
          this.subjectRef = ref;
        }}
        messageRef={(ref) => {
          this.messageRef = ref;
        }}
        refMessage={refMessage}
        refSubject={refSubject}
        subjectEror={subjectError}
        confirmModal={confirmModal}
        messageError={messageError}
        subjectFocus={this.subjectFocus}
        messageFocus={this.messageFocus}
        handleSubmitPress={this.handleSubmitPress}
        setValue={this.setValue}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {contactUsRequest};

export default connect(mapStateToProps, actions)(ContactUsController);
