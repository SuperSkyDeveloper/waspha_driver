import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {SAVE_ZONE} from '../actions/ActionTypes';

const initialState = Immutable({
  activeOrders: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ZONE.SUCCESS: {
      return Immutable.merge(state, {
        activeOrders: action.data,
      });
    }

    default:
      return state;
  }
};
