import React from 'react';
import PropTypes from 'prop-types';
import DashboardHeaderView from './DashboardHeaderView';
import {connect} from 'react-redux';

class DashboardHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <DashboardHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({user: user.data});

const actions = {};

export default connect(mapStateToProps, actions)(DashboardHeaderController);
