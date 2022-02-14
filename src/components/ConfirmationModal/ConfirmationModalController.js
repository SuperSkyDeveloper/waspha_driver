import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationModalView from './ConfirmationModalView';
import {connect} from 'react-redux';

class ConfirmationModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      showOnlyWallet: false,
      changeAmount: 0,
    };
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    amount: PropTypes.number,
    orderTotalAmount: PropTypes.number,
    handleAddCashUserWallet: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isTraditionalOrder: PropTypes.bool,
  };
  static defaultProps = {
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    isLoading: false,
    amount: 0,
    orderTotalAmount: 0,
    isTraditionalOrder: false,
  };

  componentDidMount() {
    const {orderTotalAmount, amount} = this.props;

    this.setState({changeAmount: amount - orderTotalAmount});
    let parsedAmount = parseFloat(amount);
    if (orderTotalAmount > parsedAmount) {
      this.setState({showOnlyWallet: true});
    }
  }

  render() {
    const {showOnlyWallet, changeAmount} = this.state;
    return (
      <ConfirmationModalView
        showOnlyWallet={showOnlyWallet}
        changeAmount={changeAmount}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ConfirmationModalController);
