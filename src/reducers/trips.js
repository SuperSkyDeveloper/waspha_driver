import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  EARNINGS,
  GET_TRIPS,
  TRIPS_AND_ORDERS,
  TRIPS_EARNING,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  trips: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    // case GET_TRIPS.SUCCESS: {
    //   return Immutable.merge(state, {
    //     trips: action.data,
    //   });
    // }
    case TRIPS_AND_ORDERS.SUCCESS: {
      return Immutable.merge(state, {
        trips: action.data.trips,
      });
    }
    case EARNINGS.SUCCESS: {
      return Immutable.merge(state, {
        trips: action.data.trips,
      });
    }
    // case TRIPS_EARNING.SUCCESS: {
    //   return Immutable.merge(state, {
    //     trips: action.data,
    //   });
    // }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
