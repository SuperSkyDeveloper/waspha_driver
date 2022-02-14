// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {TRIP_STATUS_LOADER, USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
  statusLoader: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TRIP_STATUS_LOADER: {
      const temp = _.cloneDeep(state.statusLoader);
      return Immutable.merge(state, {
        statusLoader: !temp,
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        data: {},
        profileSections: [],
        riderOnlineStatus: false,
        credentials: state.credentials,
      });
    }

    default:
      return state;
  }
};
