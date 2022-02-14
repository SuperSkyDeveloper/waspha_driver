import React from 'react';
import _ from 'lodash';
import {Platform, Linking, BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import AcceptOrderView from './AcceptOrderView';
import {connect} from 'react-redux';
import util from '../../util';
import {request} from '../../actions/GeneralActions';
import {
  PAYMENT_TYPE,
  PLACED_ORDER_TYPE,
  strings,
  TRIP_TYPE,
} from '../../constants';
import {manipulateDirectionData} from '../../helpers/generalHelper';
import {changeRideStatusRequest} from '../../actions/RequestsActions';
import {Actions} from 'react-native-router-flux';
import {tripStatusLoader} from '../../actions/InternalActions';
import {stopTracking} from '../../helpers/trackingHelper';

class AcceptOrderController extends React.Component {
  constructor() {
    super();
    this.state = {
      isPhoneOption: false,
      filterOrder: {},
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      showMapOptions: false,
      directionData: [],

      initialMapData: {
        latitude: 0,
        longitude: 0,
      },

      isVerificationModal: false,
      isChatOption: false,
      removeItemModal: false,
    };
  }
  static propTypes = {
    fromAcceptOrder: PropTypes.bool,
    fromPickup: PropTypes.bool,
    fromStartDelivery: PropTypes.bool,
    showUser: PropTypes.bool,
    fromNotification: PropTypes.bool,
  };
  static defaultProps = {
    fromPickup: false,
    fromStartDelivery: false,
    showUser: false,
    fromNotification: false,
    fromAcceptOrder: false,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    if (this.props.fromNotification) {
      this.setFunction();
    }
    // handle direction
    this.handleMapDirection();
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

  //here we have selected our map option from bottom sheet
  selectMapOption = (selectedOption) => {
    this.getLocation(selectedOption);
  };

  // checks which map to open , either waze or google
  openMapSheet = () => {
    this.setState({showMapOptions: !this.state.showMapOptions});
  };

  // checks which map to open , either waze or google
  onDirectionOpen = (selectedOption) => {
    const {coordinates} = this.state;
    const {orderRequest} = this.props;
    const {vendor, customer} = orderRequest;

    if (selectedOption === 'googleMap') {
      Platform.OS === 'android'
        ? Linking.openURL(
            `google.navigation:q=${vendor.location.latitude}+${vendor.location.longitude}`,
          )
        : Linking.openURL(
            `maps://app?saddr=${customer.location.latitude}+${customer.location.longitude}&daddr=${vendor.location.latitude}+${vendor.location.longitude}`,
          );
    } else {
      Linking.openURL(
        `https://waze.com/ul?ll=${vendor.location.latitude},${vendor.location.longitude}&navigate=yes`,
      );
    }
  };

  // asks for location from user
  getLocation = async (selectedOption) => {
    let cords;
    let a = await util.checkIsLocation();

    a ? (cords = await util.getCoordinates()) : '';

    const {coordinates} = cords;
    this.setState({coordinates}, () => this.onDirectionOpen(selectedOption));
  };

  //gets the location coordinates of rider
  getUserCurrentLocation = async () => {
    const {setUserData} = this.props;
    let cords;
    let a = await util.checkIsLocation();

    a
      ? (cords = await util.getCoordinates())
      : this.setState({isOnline: false});

    const {coordinates} = cords;
    let myCords = {};
    if (_.isUndefined(coordinates)) {
      myCords = {
        latitude: 0,
        longitude: 0,
      };
    } else {
      myCords = coordinates;
    }

    return myCords;
  };

  // this function handle map direction and initial map view with the help of order request status
  handleMapDirection = async () => {
    const {orderRequest, user} = this.props;
    const {status} = orderRequest;
    let getDriverCoordinates = await this.getUserCurrentLocation();

    switch (status) {
      case TRIP_TYPE.ACCEPTED:
        if (orderRequest.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        } else {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
              {
                ...orderRequest.customer.location,
                icon: orderRequest.customer.avatar,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        }

      case TRIP_TYPE.AT_PICKUP:
        if (orderRequest.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        } else {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
              {
                ...orderRequest.customer.location,
                icon: orderRequest.customer.avatar,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        }

      case TRIP_TYPE.PICKED_UP:
        if (orderRequest.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        } else {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
              {
                ...orderRequest.customer.location,
                icon: orderRequest.customer.avatar,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        }

      case TRIP_TYPE.DELIVERY_STARTED:
        if (orderRequest.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        } else {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
              {
                ...orderRequest.customer.location,
                icon: orderRequest.customer.avatar,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        }

      case TRIP_TYPE.AT_DELIVERY:
        if (orderRequest.order_type === PLACED_ORDER_TYPE.TRADITIONAL) {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        } else {
          return this.setState({
            directionData: manipulateDirectionData([
              {...getDriverCoordinates, icon: user.avatar},
              {
                ...orderRequest.vendor.location,
                icon: orderRequest.vendor.image,
              },
              {
                ...orderRequest.customer.location,
                icon: orderRequest.customer.avatar,
              },
            ]),
            initialMapData: getDriverCoordinates,
          });
        }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  setValue = (key) => {
    this.setState(key);
  };

  cancelOrder = () => {
    Actions.pop();
    Actions.pop();
  };

  selectBtnText = () => {
    const {orderRequest} = this.props;
    const {status} = orderRequest;
    switch (status) {
      case TRIP_TYPE.ACCEPTED:
        return strings.I_AM_AT_PICKUP;
      case TRIP_TYPE.AT_PICKUP:
        return strings.PICK_UP;
      case TRIP_TYPE.PICKED_UP:
        return strings.START_DELIVERY;
      case TRIP_TYPE.DELIVERY_STARTED:
        return strings.I_AM_AT_DELIVERY;
      case TRIP_TYPE.AT_DELIVERY:
        return strings.CONFIRM_DELIVERY;
      case TRIP_TYPE.DELIVERY_CONFIRMED:
        return strings.RECIEVE_PAYMENT;
    }
  };

  renderFunction = (status = this.props.orderRequest.status) => {
    this.setFunction(false, status);
  };

  setFunction = (
    fromNoti = this.props.fromNotification,
    statusType = this.props.orderRequest.status,
  ) => {
    const {orderRequest} = this.props;
    switch (statusType) {
      case TRIP_TYPE.ACCEPTED:
        // isVerificationModal handle confirmation code modal

        if (this.state.isVerificationModal) {
          // console.log('modal is open', this.state.isVerificationModal);

          return this.handleChangeRideStatus(
            {status: TRIP_TYPE.AT_PICKUP, code: orderRequest.confirmation_code},
            () => {
              Actions.replace('confirmScreen', {
                fromVerification: true,

                handleNavigation: this.setFunction,
                submitBtnText: this.selectBtnText,
              });
            },
          );
        } else {
          this.hanldeConfirmationModal();
        }
        break;
      case TRIP_TYPE.AT_PICKUP:
        if (!fromNoti) {
          return this.handleChangeRideStatus(
            {status: TRIP_TYPE.PICKED_UP},
            () => {
              Actions.replace('acceptOrder', {
                showUser: true,
                fromStartDelivery: true,
              });
            },
          );
        } else {
          Actions.replace('confirmScreen', {
            fromVerification: true,

            handleNavigation: this.renderFunction,
            submitBtnText: this.selectBtnText,
          });
        }
        break;
      case TRIP_TYPE.PICKED_UP:
        if (!fromNoti) {
          return this.handleChangeRideStatus(
            {status: TRIP_TYPE.DELIVERY_STARTED},
            () => {
              Actions.replace('acceptOrder', {
                showUser: true,
                fromStartDelivery: true,
              });
            },
          );
        }
        break;
      case TRIP_TYPE.DELIVERY_STARTED:
        if (!fromNoti) {
          return this.handleChangeRideStatus(
            {status: TRIP_TYPE.AT_DELIVERY},
            () => {
              Actions.replace('confirmScreen', {
                showUser: true,
                fromAtDelivery: true,

                handleNavigation: this.renderFunction,
                submitBtnText: this.selectBtnText,
              });
            },
          );
        }

        break;
      case TRIP_TYPE.AT_DELIVERY:
        // if order already then go direct rating screen
        if (!fromNoti) {
          if (
            orderRequest.payment_method === PAYMENT_TYPE.WALLET ||
            orderRequest.payment_method === PAYMENT_TYPE.CREDIT_CARD
          ) {
            return this.handleChangeRideStatus(
              {status: TRIP_TYPE.DELIVERY_CONFIRMED},
              () => {
                return Actions.replace('rateMyService');
              },
            );
          } else {
            return this.handleChangeRideStatus(
              {status: TRIP_TYPE.DELIVERY_CONFIRMED},
              () => {
                return Actions.replace('deliveryPayment', {
                  showUser: true,
                  submitBtnText: this.selectBtnText,
                  handleNavigation: this.renderFunction,
                });
              },
            );
          }
        } else {
          Actions.replace('confirmScreen', {
            showUser: true,
            fromAtDelivery: true,

            handleNavigation: this.renderFunction,
            submitBtnText: this.selectBtnText,
          });
        }
        break;
      case TRIP_TYPE.DELIVERY_CONFIRMED:
        stopTracking();
        if (!fromNoti) {
          return Actions.replace('recieveAmount', {
            showUser: true,
            handleChangeRiderStatus: this.handleChangeRideStatus,
            handleNavigation: this.renderFunction,
          });
        } else {
          if (
            orderRequest.payment_method === PAYMENT_TYPE.WALLET ||
            orderRequest.payment_method === PAYMENT_TYPE.CREDIT_CARD
          ) {
            return Actions.replace('rateMyService');
          } else {
            return Actions.replace('deliveryPayment', {
              showUser: true,
              submitBtnText: this.selectBtnText,
              handleNavigation: this.renderFunction,
            });
          }
        }
        break;

      case TRIP_TYPE.PAYMENT_RECEIVED:
        Actions.replace('rateMyService');

        break;
    }
  };

  // handle trip status request
  handleChangeRideStatus = (data, func) => {
    // start loading
    this.props.tripStatusLoader();

    const payload = {
      request_id: this.props.orderRequest.request_id,
      ...data,
    };

    this.props.changeRideStatusRequest(payload, (status) => {
      // store loading
      this.props.tripStatusLoader();

      if (status) {
        !_.isEmpty(func()) && func();
      }
    });
  };

  // handle confirnation code modal
  hanldeConfirmationModal = () => {
    this.setState({isVerificationModal: !this.state.isVerificationModal});
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const {
      filterOrder,
      coordinates,
      showMapOptions,
      directionData,
      initialMapData,
      isVerificationModal,
      isChatOption,
      removeItemModal,
      isPhoneOption,
    } = this.state;

    return (
      <AcceptOrderView
        initialMapData={initialMapData}
        directionData={directionData}
        isVerificationModal={isVerificationModal}
        isChatOption={isChatOption}
        removeItemModal={removeItemModal}
        isPhoneOption={isPhoneOption}
        handleMapDirection={this.handleMapDirection}
        filterOrder={filterOrder}
        showMapOptions={showMapOptions}
        coordinates={coordinates}
        openMapSheet={this.openMapSheet}
        selectMapOption={this.selectMapOption}
        /////////////////////////////////////////////////////////////////////
        renderFunction={this.renderFunction}
        setValue={this.setValue}
        cancelOrder={this.cancelOrder}
        selectBtnText={this.selectBtnText}
        setFunction={this.setFunction}
        handleChangeRideStatus={this.handleChangeRideStatus}
        hanldeConfirmationModal={this.hanldeConfirmationModal}
        /////////////////////////////////////////////////////////////////

        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, requests}) => ({
  orderRequest: requests.requests[0],

  user: user.data,
});

const actions = {changeRideStatusRequest, tripStatusLoader};

export default connect(mapStateToProps, actions)(AcceptOrderController);
