import React from 'react';
import {BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import DeliveryPaymentView from './DeliveryPaymentView';
import {connect} from 'react-redux';
import {getRequestsRequest} from '../../actions/RequestsActions';

class DeliveryPaymentController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    request: PropTypes.object,
    showUser: PropTypes.bool,
    filterOrder: PropTypes.object,
  };
  static defaultProps = {
    request: {},
    showUser: false,
    filterOrder: {},
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    const payload = {
      request_id: this.props.request.request_id,
    };
    this.props.getRequestsRequest(payload, (status) => {});
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    Actions.replace('notification');
    return true;
  };

  render() {
    return <DeliveryPaymentView {...this.props} />;
  }
}

const mapStateToProps = ({user, requests, orders}) => ({
  user: user.data,
  request: requests.requests[0],
  orders: orders.orders,
});
const actions = {getRequestsRequest};

export default connect(mapStateToProps, actions)(DeliveryPaymentController);
