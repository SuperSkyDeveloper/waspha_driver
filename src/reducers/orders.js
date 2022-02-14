import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  EARNINGS,
  GET_ORDERS,
  ORDER_REQUEST,
  TRIPS_AND_ORDERS,
  USER_SIGNOUT,
  GET_ACTIVE_ORDERS,
} from '../actions/ActionTypes';

const initialState = Immutable({
  orders: [],
  orderRequest: {},
  activeOrders: [],
  totalEarnings: 0,
  totalPenalty: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    // case GET_ORDERS.SUCCESS: {
    //   return Immutable.merge(state, {
    //     orders: action.data,
    //   });
    // }
    case TRIPS_AND_ORDERS.SUCCESS: {
      console.log({asdfasdfasdf: action.data});
      return Immutable.merge(state, {
        orders: action.data.orders,
      });
    }
    case ORDER_REQUEST.SUCCESS: {
      return Immutable.merge(state, {
        orderRequest: action.data,
      });
    }
    case EARNINGS.SUCCESS: {
      return Immutable.merge(state, {
        orders: action.data.orders,
        totalEarnings: action.data.total_earnings,
        totalPenalty: action.data.total_penalty,
      });
    }

    case GET_ACTIVE_ORDERS.SUCCESS: {
      return Immutable.merge(state, {
        activeOrders: [action.data[0].orders[0].id],
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
