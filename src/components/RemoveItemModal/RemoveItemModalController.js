import React from 'react';
import PropTypes from 'prop-types';
import RemoveItemModalView from './RemoveItemModalView';
import {connect} from 'react-redux';
import {strings} from '../../constants';

class RemoveItemModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    btnOneText: PropTypes.string,
    btnTwoText: PropTypes.string,
    btnOneFunc: PropTypes.func,
    btnTwoFunc: PropTypes.func,
    modalType: PropTypes.string,
    showOneBtn: PropTypes.bool,
    applybackPressAndDrop: PropTypes.bool,
  };
  static defaultProps = {
    isModalOpen: false,
    closeModal: () => {},
    title: strings.CANCEL_ORDER,
    btnOneText: strings.YES,
    btnTwoText: strings.NO,
    btnOneFunc: () => {},
    btnTwoFunc: () => {},
    modalType: 'removeItemModal',
    showOneBtn: false,
    applybackPressAndDrop: true,
  };

  render() {
    return <RemoveItemModalView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(RemoveItemModalController);
