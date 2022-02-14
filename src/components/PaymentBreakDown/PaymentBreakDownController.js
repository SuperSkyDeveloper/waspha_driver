import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PaymentBreakDownView from './PaymentBreakDownView';
import {connect} from 'react-redux';
import {strings, APPLY_ON_OPTIONS} from '../../constants';

class PaymentBreakDownController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billItems: props.data.bill,
      isDiscounted: false,
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    handleShareBtn: PropTypes.func.isRequired,
    selectedPromoCode: PropTypes.object,
  };
  static defaultProps = {
    selectedPromoCode: null,
  };

  componentDidMount = () => {
    this.handleBill();
  };

  handleBill = () => {
    const {data} = this.props;
    if (data.bill[0].value > data.bill[1].value) {
      this.setState({isDiscounted: true});
    } else {
      this.removeDiscountAmount();
    }
  };

  removeDiscountAmount = () => {
    const {data} = this.props;

    let billItems = _.cloneDeep(data.bill);
    delete billItems[1];
    this.setState({billItems});
  };

  validateApplyPromo = (item) => {
    const {selectedPromoCode} = this.props;
    const {isDiscounted} = this.state;

    return (
      !_.isNil(selectedPromoCode) &&
      ((selectedPromoCode.apply_on === item.key && item.key !== 'subtotal') ||
        (selectedPromoCode.apply_on === item.key &&
          item.key === 'subtotal' &&
          !isDiscounted) ||
        (selectedPromoCode.apply_on === 'subtotal' &&
          item.key === 'subtotal_discounted' &&
          isDiscounted))
    );
  };

  getPromoCodeTotal = () => {
    const {selectedPromoCode, data} = this.props;

    return (
      !_.isNil(data.total.discounted_value) &&
      !_.isNil(selectedPromoCode) &&
      selectedPromoCode.apply_on === APPLY_ON_OPTIONS.TOTAL
    );
  };

  render() {
    const {billItems, isDiscounted} = this.state;
    return (
      <PaymentBreakDownView
        billItems={billItems}
        isDiscounted={isDiscounted}
        getPromoCodeTotal={this.getPromoCodeTotal}
        validateApplyPromo={this.validateApplyPromo}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, requests}) => ({
  user: user.data,
  orderRequest: requests.requests[0],
});
const actions = {};

export default connect(mapStateToProps, actions)(PaymentBreakDownController);
