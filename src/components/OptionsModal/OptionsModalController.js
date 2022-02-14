import React from 'react';
import PropTypes from 'prop-types';
import OptionsModalView from './OptionsModalView';
import {connect} from 'react-redux';

class OptionsModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: '',
    };
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    callBack: PropTypes.func,
    selectedModeId: PropTypes.number,
    data: PropTypes.object,
    isTraditionalOrder: PropTypes.bool,
    showPhoneOptions: PropTypes.bool,
    showHeading: PropTypes.bool,
  };
  static defaultProps = {
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    callBack: () => {},
    selectedModeId: 2,
    data: {},
    isTraditionalOrder: false,
    showPhoneOptions: false,
    showHeading: true,
  };

  componentDidMount() {
    const {selectedModeId} = this.props;
    this.setState({activeId: selectedModeId});
  }

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    const {activeId} = this.state;
    return (
      <OptionsModalView
        setValue={(data) => this.setValue(data)}
        activeId={activeId}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(OptionsModalController);
