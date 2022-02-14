import React from 'react';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import RecieveAmountView from './RecieveAmountView';
import {connect} from 'react-redux';
import util from '../../util';
import {strings, TRIP_TYPE} from '../../constants';
import {addToWalletRequest} from '../../actions/RequestsActions';

class RecieveAmountController extends React.Component {
  constructor() {
    super();
    this.state = {amount: '', amountError: '', isConfirmationModal: false};
  }
  static propTypes = {
    request: PropTypes.object,
    filterOrder: PropTypes.object,
    showUser: PropTypes.bool,
    isLoading: false,
  };
  static defaultProps = {request: {}, filterOrder: {}, showUser: false};

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    Actions.replace('notification');
    return true;
  };

  setValue = (key) => {
    this.setState(key);
  };

  amountFocus = () => {
    this.amountRef.focus();
  };

  validation = () => {
    const {amount} = this.state;
    let error = true;

    if (_.isEmpty(amount)) {
      this.setState({amountError: strings.PLEASE_ENTER_AMOUNT});
      this.amountFocus();
      error = false;
    }

    if (this.props.request.orders[0].invoice.total.value > amount) {
      this.setState({amountError: strings.AMOUNT_ENTERED_NOT_MATCHED});
      this.amountFocus();
      error = false;
    }
    return error;
  };

  handleSubmit = () => {
    const {amount} = this.state;
    this.setState({amountError: ''});
    if (this.validation()) {
      this.setState({isConfirmationModal: true});
    }
  };

  handleReturnCash = () => {
    const {handleChangeRiderStatus} = this.props;
    handleChangeRiderStatus({status: TRIP_TYPE.PAYMENT_RECEIVED}, () => {
      this.setValue({isConfirmationModal: false});
      return Actions.replace('rateMyService');
    });
  };

  // handle add remaining cash to customer
  handleAddCashUserWallet = (changeAmount) => {
    // start loading
    this.setState({
      isLoading: true,
    });

    const payload = {
      user_id: this.props.request.customer.id,
      amount: changeAmount.toFixed(2),
    };
    this.props.addToWalletRequest(payload, (status) => {
      // stop loading
      this.setState({
        isLoading: false,
      });
      if (status) {
        this.setState({isConfirmationModal: false});
        this.handleReturnCash();
      }
    });
  };

  render() {
    const {amount, amountError, isConfirmationModal, isLoading} = this.state;
    return (
      <RecieveAmountView
        amount={amount}
        amountError={amountError}
        isConfirmationModal={isConfirmationModal}
        isLoading={isLoading}
        amountFocus={this.amountFocus}
        setValue={this.setValue}
        handleSubmit={this.handleSubmit}
        handleBackButtonClick={this.handleBackButtonClick}
        handleReturnCash={this.handleReturnCash}
        handleAddCashUserWallet={this.handleAddCashUserWallet}
        amountRef={(ref) => {
          this.amountRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, requests}) => ({
  user: user.data,
  request: requests.requests[0],
});

const actions = {
  addToWalletRequest,
};

export default connect(mapStateToProps, actions)(RecieveAmountController);
