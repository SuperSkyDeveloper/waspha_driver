import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import VendorDashboardView from './VendorDashboardView';
import {connect} from 'react-redux';

class VendorDashboardController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <VendorDashboardView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(VendorDashboardController);
