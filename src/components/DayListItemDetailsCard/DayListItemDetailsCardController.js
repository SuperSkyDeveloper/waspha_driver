import React from 'react';
import PropTypes from 'prop-types';
import DayListItemDetailsCardView from './DayListItemDetailsCardView';
import {connect} from 'react-redux';

class DayListItemDetailsCardController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isToggleAble: PropTypes.bool,
    item: PropTypes.obj,
    changeCardColor: PropTypes.bool,
    active: PropTypes.bool,
    handleIndex: PropTypes.func,
    index: PropTypes.number,
  };
  static defaultProps = {
    isToggleAble: false,
    item: {},
    changeCardColor: false,
    active: false,
    handleIndex: () => {},
    index: null,
  };

  render() {
    return <DayListItemDetailsCardView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(DayListItemDetailsCardController);
