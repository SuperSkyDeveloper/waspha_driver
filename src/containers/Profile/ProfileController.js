import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ProfileView from './ProfileView';
import {
  changeOnlineStatusRequest,
  updateUserProfileRequest,
  userSignOutRequest,
} from '../../actions/UserActions';
import {stopTracking} from '../../helpers/trackingHelper';
import util from '../../util';
import {alertMessage} from '../../actions/GeneralActions';
import {strings} from '../../constants';

class ProfileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showByWalkFields:
        _.isNil(props.user.vehicle.name) &&
        _.isNil(props.user.vehicle.number_plate),
      isLoading: false,
      isEditAble: false,
      selectedVehicleId: null,
      vehicleName: props.user.vehicle.name,
      vehicleNameError: '',
      regNo: props.user.vehicle.number_plate,
      regNoError: '',
      email: props.user.email.address,
      emailError: '',
      isBtnLoading: false,
      activeIndex: null,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.email.address !== prevProps.user.email.address) {
      this.setState({email: this.props.user.email.address});
    }
  }

  handleIndex = (item, index) => {
    this.setState({selectedVehicleId: item.id, activeIndex: index});
  };

  validate = () => {
    const {vehicleName, regNo, selectedVehicleId} = this.state;
    const {alertMessage} = this.props;

    let valid = true;

    if (_.isEmpty(regNo)) {
      this.setState({
        regNoError: strings.REG_NO_IS_REQ,

        // util.isRequiredErrorMessage('Reg No.')
      });
      this.regNoRefFocus();
      valid = false;
    }

    if (_.isEmpty(vehicleName)) {
      this.setState({
        vehicleNameError: strings.VEHICLE_NAME_IS_REQ,
        // util.isRequiredErrorMessage('Vehicle Name'),
      });
      this.vehicleNameRefFocus();
      valid = false;
    }

    if (_.isNil(selectedVehicleId)) {
      alertMessage(strings.PLEASE_SELECT_VEHICLE);
      valid = false;
    }

    return valid;
  };

  setValue = (key) => {
    this.setState(key);
  };

  updateProfile = () => {
    const {updateUserProfileRequest} = this.props;
    const {vehicleName, regNo, selectedVehicleId} = this.state;
    if (this.validate()) {
      this.setState({vehicleNameError: '', regNoError: '', isBtnLoading: true});
      const payload = {
        vehicle_id: selectedVehicleId,
        vehicle_name: vehicleName,
        number_plate: regNo,
      };
      updateUserProfileRequest(payload, (res) => {
        this.setState({isBtnLoading: false});
        if (res) {
          // Actions.reset('drawerMenu');
        }
      });
    }
  };

  // handle Logout
  handleLogout = () => {
    this.props.changeOnlineStatusRequest({is_online: false}, () => {});
    stopTracking();

    Actions.reset('login');
    this.props.userSignOutRequest((status) => {});
  };

  vehicleNameRefFocus = () => {
    this.vehicleNameRefRef.focus();
  };

  regNoRefFocus = () => {
    this.regNoRefRef.focus();
  };

  emailRefFocus = () => {
    this.emailRefRef.focus();
  };

  render() {
    const {
      activeIndex,
      showByWalkFields,
      isLoading,
      isEditAble,
      vehicleName,
      vehicleNameError,
      regNo,
      regNoError,
      email,
      emailError,
      isBtnLoading,
    } = this.state;
    return (
      <ProfileView
        showByWalkFields={showByWalkFields}
        isLoading={isLoading}
        activeIndex={activeIndex}
        isEditAble={isEditAble}
        vehicleName={vehicleName}
        vehicleNameError={vehicleNameError}
        regNo={regNo}
        regNoError={regNoError}
        email={email}
        emailError={emailError}
        isBtnLoading={isBtnLoading}
        handleIndex={this.handleIndex}
        handleLogout={this.handleLogout}
        setValue={this.setValue}
        updateProfile={this.updateProfile}
        vehicleNameRef={(ref) => {
          this.vehicleNameRef = ref;
        }}
        regNoRef={(ref) => {
          this.regNoRef = ref;
        }}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  user: user.data,
  vehicles: general.appSetting.delivery_vehicles,
});

const actions = {
  changeOnlineStatusRequest,
  userSignOutRequest,
  updateUserProfileRequest,
  alertMessage,
};

export default connect(mapStateToProps, actions)(ProfileController);
