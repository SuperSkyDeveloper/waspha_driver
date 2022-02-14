import React from 'react';
import PropTypes from 'prop-types';
import VehicleListView from './VehicleListView';
import {connect} from 'react-redux';

class VehicleListController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    activeIndex: PropTypes.bool,
    togglePress: PropTypes.func,
    items: PropTypes.array,
    isHorizontal: PropTypes.bool,
  };
  static defaultProps = {items: [], isHorizontal: false, togglePress: () => {}};

  render() {
    return <VehicleListView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(VehicleListController);
