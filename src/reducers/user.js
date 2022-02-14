// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  GET_PROFILE_SECTIONS,
  SET_USER_DATA,
  REMEMBER_ME,
  RESEND_OTP,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP,
  VERIFY_RESET_PASSWORD,
  CHANGE_ONLINE_STATUS,
  UPDATE_USER_DATA,
  REFRESH_TOKEN,
  GET_PROFILE_DETAIL,
  UPDATE_IN_REGION,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  profileSections: [],
  riderProfile: {},
  credentials: {},
  riderOnlineStatus: false,
  isInRegion: true,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ONLINE_STATUS.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case USER_SIGNIN.SUCCESS: {
      // todo remove coordinates from here
      let temp = _.cloneDeep(action.data);

      return Immutable.merge(state, {
        data: temp,
      });
    }
    case USER_SIGNUP.SUCCESS: {
      let temp = _.cloneDeep(action.data);

      return Immutable.merge(state, {
        data: temp,
      });
    }
    case VERIFY_RESET_PASSWORD.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_FORGOT_PASSWORD.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_CONFIRM_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case RESEND_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      console.log({actiondata: action.data});
      let temp = _.cloneDeep(state.data);

      temp.zone_option = action.data.zone_option;
      temp.fixed_zone_id = action.data.fixed_zone_id;
      temp.free_zone_radius = action.data.free_zone_radius;
      temp.is_zone_selected = action.data.is_zone_selected;
      temp.is_approved = action.data.is_approved;
      temp.vehicle = action.data.vehicle;

      return Immutable.merge(state, {
        data: temp,
        riderProfile: action.data,
      });
    }

    case CHANGE_EMAIL_OR_PHONE_OTP.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, {
        data: {},
        profileSections: [],
        riderOnlineStatus: false,
        credentials: state.credentials,
        isInRegion: true,
      });
    }

    case UPDATE_USER_DATA.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    case GET_PROFILE_SECTIONS.SUCCESS: {
      return Immutable.merge(state, {
        profileSections: action.data,
      });
    }

    case SET_USER_DATA: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case REMEMBER_ME: {
      return Immutable.merge(state, {
        credentials: action.data,
      });
    }

    case REFRESH_TOKEN: {
      let newData = _.cloneDeep(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }

    case GET_PROFILE_DETAIL.SUCCESS: {
      console.log({actiondata: action.data});
      let temp = _.cloneDeep(state.data);

      temp.zone_option = action.data.zone_option;
      temp.fixed_zone_id = action.data.fixed_zone_id;
      temp.free_zone_radius = action.data.free_zone_radius;
      temp.is_zone_selected = action.data.is_zone_selected;
      temp.is_approved = action.data.is_approved;

      return Immutable.merge(state, {
        data: temp,
        riderProfile: action.data,
      });
    }

    case UPDATE_IN_REGION: {
      return Immutable.merge(state, {
        isInRegion: action.data,
      });
    }

    default:
      return state;
  }
};
