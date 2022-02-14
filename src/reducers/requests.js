import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  ACCEPT_ORDER,
  CHANGE_RIDE_STATUS,
  GET_ACTIVE_ORDERS,
  GET_REQUESTS,
  IS_ORDER_RATED,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import {Images} from '../theme';
import {PLACED_ORDER_TYPE, RIDER_TYPE, TRIP_TYPE} from '../constants';

const initialState = Immutable({
  requests: [],
  orderRated: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS.SUCCESS: {
      const temp = _.cloneDeep(action.data);

      // todo backend se lat lng ki key change krwani ha
      temp.vendor.location.latitude = temp.vendor.location.lat;
      temp.vendor.location.longitude = temp.vendor.location.lng;

      if (temp.order_type !== PLACED_ORDER_TYPE.TRADITIONAL) {
        temp.customer.location.latitude = temp.customer.location.lat;
        temp.customer.location.longitude = temp.customer.location.lng;
      }
      temp.is_paid = false;
      return Immutable.merge(state, {
        requests: [temp],
      });
    }
    case CHANGE_RIDE_STATUS.SUCCESS: {
      //  todo
      let temp = _.cloneDeep(state.requests);
      temp[0].status = action.data;
      return Immutable.merge(state, {
        requests: temp,
      });
    }
    case ACCEPT_ORDER.SUCCESS: {
      let temp = _.cloneDeep(state.requests);
      temp[0].status = TRIP_TYPE.ACCEPTED;
      return Immutable.merge(state, {
        requests: temp,
      });
    }

    case GET_ACTIVE_ORDERS.SUCCESS: {
      console.log({data: action.data});
      return Immutable.merge(state, {
        requests: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case IS_ORDER_RATED.SUCCESS: {
      return Immutable.merge(state, {
        orderRated: action.data,
      });
    }

    default:
      return state;
  }
};
