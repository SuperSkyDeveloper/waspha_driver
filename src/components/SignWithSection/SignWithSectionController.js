import React from 'react';
import PropTypes from 'prop-types';
import SignWithSectionView from './SignWithSectionView';
import {connect} from 'react-redux';

class SignWithSectionController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    signup: PropTypes.bool,
    login: PropTypes.bool,
  };
  static defaultProps = {
    signup: false,
    login: false,
  };

  render() {
    return <SignWithSectionView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(SignWithSectionController);
