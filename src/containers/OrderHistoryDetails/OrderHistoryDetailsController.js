import React from 'react';
import PropTypes from 'prop-types';
import OrderHistoryDetailsView from './OrderHistoryDetailsView';
import {connect} from 'react-redux';
import {DATE_FORMAT3} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';

class OrderHistoryDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {item: PropTypes.object};
  static defaultProps = {
    item: {},
  };

  render() {
    return <OrderHistoryDetailsView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(OrderHistoryDetailsController);
