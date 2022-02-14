import React from 'react';
import PropTypes from 'prop-types';
import ProfileInputFieldsView from './ProfileInputFieldsView';
import {connect} from 'react-redux';

class ProfileInputFieldsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchActive: props.user.language === 'en',
    };
  }
  static propTypes = {
    showByWalkFields: PropTypes.bool,
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func,
    isEditAble: PropTypes.bool,
    vehicleName: PropTypes.string,
    vehicleNameError: PropTypes.string,
    regNo: PropTypes.string,
    regNoError: PropTypes.string,
    email: PropTypes.string,
    emailError: PropTypes.string,
    vehicleNameRefFocus: PropTypes.func,
    regNoRefFocus: PropTypes.func,
    emailRefFocus: PropTypes.func,
    vehicleNameRef: PropTypes.instanceOf,
    regNoRef: PropTypes.instanceOf,
    emailRef: PropTypes.instanceOf,
    setValue: PropTypes.func,
  };
  static defaultProps = {
    showByWalkFields: false,
    isEditAble: false,

    vehicleName: '',
    vehicleNameError: '',
    regNo: '',
    regNoError: '',
    email: '',
    emailError: '',
    vehicleNameRefFocus: () => {},
    regNoRefFocus: () => {},
    emailRefFocus: () => {},
    setValue: () => {},
  };

  render() {
    const {isSwitchActive} = this.state;
    return (
      <ProfileInputFieldsView isSwitchActive={isSwitchActive} {...this.props} />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ProfileInputFieldsController);
