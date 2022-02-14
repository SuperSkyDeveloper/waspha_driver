import React from 'react';
import PropTypes from 'prop-types';
import ConfirmScreenView from './ConfirmScreenView';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';
import {tripStatusLoader} from '../../actions/InternalActions';

class ConfirmScreenController extends React.Component {
  constructor() {
    super();
    this.state = {filterOrder: {}, loader: true};
  }
  static propTypes = {
    requests: PropTypes.object,
    orders: PropTypes.array,
    showUser: PropTypes.bool,
    fromVerification: PropTypes.bool,
    fromPickup: PropTypes.bool,
    fromStartDelivery: PropTypes.bool,
    fromAtDelivery: PropTypes.bool,
  };
  static defaultProps = {
    requests: {},
    orders: [],
    fromVerification: false,
    fromPickup: false,
    fromStartDelivery: false,
    fromAtDelivery: false,
    showUser: false,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    const {request, orders} = this.props;
    let filteredOrders = [];
    request.orders.map((req_order) => {
      filteredOrders =
        orders &&
        orders.filter((order) => {
          return order.id === req_order;
        });
    });

    this.setState({filterOrder: filteredOrders[0]}, () => {
      this.setState({loader: false});
    });
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

  selectBtnText = () => {
    const {fromVerification, fromAtDelivery} = this.props;

    if (fromVerification) {
      return strings.I_PICKED_UP;
    }

    if (fromAtDelivery) {
      return strings.CONFIRM_DELIVERY;
    }
  };

  setFunction = () => {
    const {fromVerification, request, fromAtDelivery} = this.props;
    const {filterOrder} = this.state;

    if (fromVerification) {
      return Actions.acceptOrder({showUser: true, request, fromPickup: true});
    }
    if (fromAtDelivery) {
      return Actions.deliveryPayment({showUser: true, request, filterOrder});
    }
  };

  render() {
    const {filterOrder, loader} = this.state;
    return (
      <ConfirmScreenView
        filterOrder={filterOrder}
        loader={loader}
        setFunction={this.setFunction}
        selectBtnText={this.selectBtnText}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({requests, orders, internal, user}) => ({
  request: requests.requests[0],
  orders: orders.orders,
  btnLoading: internal.statusLoader,
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(ConfirmScreenController);
