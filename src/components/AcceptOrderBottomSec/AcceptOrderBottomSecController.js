import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AcceptOrderBottomSecView from './AcceptOrderBottomSecView';
import {connect} from 'react-redux';
import {distance} from '../../helpers/generalHelper';
import {changeRideStatusRequest} from '../../actions/RequestsActions';
import {tripStatusLoader} from '../../actions/InternalActions';

class AcceptOrderBottomSecController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    vendor: PropTypes.object.isRequired,
    shouldEnableContactOption: PropTypes.bool,
    onMapNavPress: PropTypes.func,
    fromPickup: PropTypes.bool,
    fromStartDelivery: PropTypes.bool,
    orderRequest: PropTypes.object,
    isChatOption: PropTypes.bool,
    removeItemModal: PropTypes.bool,
    isVerificationModal: PropTypes.bool,
    fromAcceptOrder: PropTypes.bool,
    isPhoneOption: PropTypes.bool,
  };
  static defaultProps = {
    onMapNavPress: () => {},
    shouldEnableContactOption: false,
    fromPickup: false,
    fromStartDelivery: false,
    orderRequest: {},
    isChatOption: false,
    removeItemModal: false,
    isVerificationModal: false,
    fromAcceptOrder: false,
    isPhoneOption: false,
  };

  render() {
    return <AcceptOrderBottomSecView {...this.props} />;
  }
}

const mapStateToProps = ({user, requests, internal}) => {
  return {
    user: user.data,
    request: requests.requests[0],
    btnLoading: internal.statusLoader,
  };
};

const actions = {
  changeRideStatusRequest,
  tripStatusLoader,
};

export default connect(
  mapStateToProps,
  actions,
)(AcceptOrderBottomSecController);
