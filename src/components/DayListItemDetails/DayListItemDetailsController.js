import React from 'react';
import PropTypes from 'prop-types';
import DayListItemDetailsView from './DayListItemDetailsView';
import {connect} from 'react-redux';

class DayListItemDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {activeIndex: null};
  }

  static propTypes = {
    item: PropTypes.object,
    isHorizontal: PropTypes.bool,
    isToggleAble: PropTypes.bool,
    changeCardColor: PropTypes.bool,
  };
  static defaultProps = {
    item: {},
    isHorizontal: true,
    isToggleAble: false,
    changeCardColor: false,
  };

  handleIndex = (index) => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  render() {
    const {activeIndex} = this.state;
    return (
      <DayListItemDetailsView
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(DayListItemDetailsController);
