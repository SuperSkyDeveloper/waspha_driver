// @flow

import {SAVE_ZONE} from './ActionTypes';

export function saveZoneRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SAVE_ZONE.REQUEST,
  };
}

export function saveZoneSuccess(data) {
  return {
    data,
    type: SAVE_ZONE.SUCCESS,
  };
}
