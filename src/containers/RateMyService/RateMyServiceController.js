import React from 'react';
import _ from 'lodash';
import {BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import RateMyServiceView from './RateMyServiceView';
import {connect} from 'react-redux';
import {reviewsRatingsRequest} from '../../actions/RequestsActions';
import {Actions} from 'react-native-router-flux';
import {PLACED_ORDER_TYPE} from '../../constants';

const refCustom = React.createRef();
const refDriver = React.createRef();
class RateMyServiceController extends React.Component {
  constructor() {
    super();
    this.state = {
      vendorRating: 1,
      customerRating: 1,
      vendorReview: '',
      customerReview: '',
      isLoading: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

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

  commentFocus = () => {
    this.commentRef.focus();
  };

  // handle submit reveiw and ranting
  handleAddReviewAndRating = () => {
    // start loading
    this.setState({
      isLoading: true,
    });

    const {vendorRating, customerRating, vendorReview, customerReview} =
      this.state;

    const {request} = this.props;
    let payload = {
      order_id: request.orders[0].id,
      store: {
        id: request.vendor.id,
        review: _.isEmpty(vendorReview) ? null : vendorReview,
        rating: vendorRating,
      },
    };

    if (request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL) {
      payload['user'] = {
        id: request.customer.id,
        review: _.isEmpty(customerReview) ? null : customerReview,
        rating: customerRating,
      };
    }

    this.props.reviewsRatingsRequest(payload, (status) => {
      // false loading
      this.setState({
        isLoading: false,
      });

      if (status) {
        return Actions.reset('drawerMenu');
      }
    });
  };

  render() {
    const {
      vendorRating,
      customerRating,
      vendorReview,
      customerReview,
      isLoading,
    } = this.state;

    return (
      <RateMyServiceView
        isLoading={isLoading}
        handleAddReviewAndRating={this.handleAddReviewAndRating}
        setValue={this.setValue}
        commentFocus={this.commentFocus}
        vendorRating={vendorRating}
        customerRating={customerRating}
        vendorReview={vendorReview}
        customerReview={customerReview}
        refCustom={refCustom}
        refDriver={refDriver}
        commentRef={(ref) => {
          this.commentRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({requests}) => ({
  request: requests.requests[0],
});

const actions = {
  reviewsRatingsRequest,
};

export default connect(mapStateToProps, actions)(RateMyServiceController);
