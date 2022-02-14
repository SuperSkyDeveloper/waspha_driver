import React from 'react';
import PropTypes from 'prop-types';
import OrderListView from './OrderListView';
import {connect} from 'react-redux';

class OrderListController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    items: PropTypes.object,
    showNoOfItems: PropTypes.bool,
    fromAtDelivery: PropTypes.bool,
  };
  static defaultProps = {
    items: {},
    showNoOfItems: false,
    fromAtDelivery: false,
  };

  render() {
    return <OrderListView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(OrderListController);
