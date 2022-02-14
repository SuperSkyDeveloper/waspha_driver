import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RequestOrderView from './RequestOrderView';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {manipulateDirectionData} from '../../helpers/generalHelper';
import {Actions} from 'react-native-router-flux';
import {
  acceptOrderRequest,
  getRequestsRequest,
} from '../../actions/RequestsActions';
import {
  DRIVERS_TYPE,
  PLACED_ORDER_TYPE,
  strings,
  TIME_FORMAT,
  TRIP_TYPE,
} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';
import {startTracking} from '../../helpers/trackingHelper';

class RequestOrderController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      acceptLoading: false,
      acceptTripDuration: null,
      directionData: [],
    };
  }
  static propTypes = {
    requestId: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  componentDidMount() {
    this.initial();
    this.renderTimeLeft();
  }

  // check order request
  initial = () => {
    const payload = {
      request_id: this.props.requestId,
    };

    this.props.getRequestsRequest(payload, (status) => {
      console.log({status});
      if (status) {
        this.handleRequestExpiryTime();
        let directionData = manipulateDirectionData([
          {
            latitude: this.props.user.coordinates.latitude,
            longitude: this.props.user.coordinates.longitude,
            icon: this.props.user.avatar,
          },

          {
            latitude: this.props.request.vendor.location.latitude,
            longitude: this.props.request.vendor.location.longitude,
            icon: this.props.request.vendor.image,
          },
        ]);

        if (this.props.request.order_type !== PLACED_ORDER_TYPE.TRADITIONAL) {
          directionData.push({
            latitude: this.props.request.customer.location.latitude,
            longitude: this.props.request.customer.location.longitude,
            icon: this.props.request.customer.avatar,
          });
        }

        // this.checkRequestStatus();
        this.setState({
          directionData,
          isLoading: false,
        });
      } else {
        console.log({dddada: 'HEHEHEH'});
        Actions.pop();
      }
    });
  };

  // checkRequestStatus = () => {
  //   const {request} = this.props;
  //   if (request.status !== TRIP_TYPE.PENDING) {
  //     Actions.replace('acceptOrder', {fromNotification: true});
  //   }
  // };

  getheaderImageFinalDimension = () => {
    const window = Dimensions.get('window');
    const headerImageWidth = 373;
    const headerImageHeight = 147;
    const ratio = window.width / headerImageWidth;
    return {height: headerImageHeight * ratio, width: window.width};
  };

  // handle accept order
  handleAcceptOrder = () => {
    console.log('lodasin');
    // start loading
    this.setState({
      acceptLoading: true,
    });
    const payload = {
      request_id: this.props.requestId,
      accept: true,
    };
    this.props.acceptOrderRequest(payload, (status) => {
      // stop loading
      this.setState({
        acceptLoading: false,
      });
      if (status) {
        startTracking();
        Actions.replace('acceptOrder');
      }
    });
  };

  // handle accept order
  handleDeclineOrder = () => {
    // start loading
    this.setState({
      isLoading: true,
    });
    const payload = {
      request_id: this.props.requestId,
      accept: false,
    };
    this.props.acceptOrderRequest(payload, (status) => {
      // stop loading
      this.setState({
        isLoading: false,
      });
      if (status) {
        Actions.reset('drawerMenu');
      }
    });
  };

  // handle submit button action
  handleSubmitButtonAction = () => {
    const {user} = this.props;
    switch (user.type) {
      case DRIVERS_TYPE.ONLINE:
        return this.handleAcceptOrder({fromAcceptOrder: true});
      case DRIVERS_TYPE.WASPHA_EXPRESS:
        return this.handleAcceptOrder({fromAcceptOrder: true});
    }
  };

  // handle trip expire time
  handleRequestExpiryTime = () => {
    const {request} = this.props;

    let jobAssignTime = moment(request.request_time).add(
      request.expiry_minutes,
      'minutes',
    );

    let differenceMint = jobAssignTime.diff(moment(), 'minutes');
    this.setState({
      acceptTripDuration: differenceMint,
    });
  };

  renderTimeLeft = () => {
    setInterval(
      () => {
        this.setState({acceptTripDuration: this.state.acceptTripDuration - 1});
      },

      60000,
    );
  };

  render() {
    const {isLoading, acceptLoading, directionData} = this.state;
    return (
      <RequestOrderView
        {...this.props}
        directionData={directionData}
        isLoading={isLoading}
        acceptLoading={acceptLoading}
        acceptTripDuration={this.state.acceptTripDuration}
        handleSubmitButtonAction={this.handleSubmitButtonAction}
        handleDeclineOrder={this.handleDeclineOrder}
        handleAcceptOrder={this.handleAcceptOrder}
        renderTimeLeft={this.renderTimeLeft}
        getheaderImageFinalDimension={this.getheaderImageFinalDimension}
      />
    );
  }
}

const mapStateToProps = ({requests, user}) => ({
  request: requests.requests[0],
  user: user.data,
});

const actions = {
  getRequestsRequest,
  acceptOrderRequest,
};

export default connect(mapStateToProps, actions)(RequestOrderController);
