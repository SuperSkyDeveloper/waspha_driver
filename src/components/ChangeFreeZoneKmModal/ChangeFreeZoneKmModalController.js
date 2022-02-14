import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ChangeFreeZoneKmModalView from './ChangeFreeZoneKmModalView';
import {connect} from 'react-redux';
import {View} from 'react-native';
class ChangeFreeZoneKmModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      maxLength: 0,
    };
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    submit: PropTypes.func,
    freeZoneRadius: PropTypes.number,
    error: PropTypes.string,
  };
  static defaultProps = {
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    submit: () => {},
    freeZoneRadius: 0,
    error: '',
  };

  checkValueInFloat() {
    const value = this.props.freeZoneRadius;
    var er = /^-?[0-9]+$/;

    return er.test(value);
  }

  render() {
    console.log({checkValueInFloat: this.checkValueInFloat()});
    return (
      <ChangeFreeZoneKmModalView
        checkValueInFloat={this.checkValueInFloat()}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(ChangeFreeZoneKmModalController);
