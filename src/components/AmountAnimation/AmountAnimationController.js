import React from 'react';
import PropTypes from 'prop-types';
import AmountAnimationView from './AmountAnimationView';
import {connect} from 'react-redux';

class AmountAnimationController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    list: PropTypes.array,
    showEyeIcon: PropTypes.bool,
  };
  static defaultProps = {
    isModalOpen: false,
    list: [],
    showEyeIcon: true,
  };

  render() {
    return <AmountAnimationView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(AmountAnimationController);
