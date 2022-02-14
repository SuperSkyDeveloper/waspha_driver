import React from 'react';
import PropTypes from 'prop-types';
import DayListView from './DayListView';
import {connect} from 'react-redux';

class DayListController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    item: PropTypes.object,
    active: PropTypes.bool,
    handleIndex: PropTypes.func,
    index: PropTypes.number,
  };
  static defaultProps = {
    item: {},
    active: false,
    handleIndex: () => {},
    index: null,
  };

  render() {
    return <DayListView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(DayListController);
