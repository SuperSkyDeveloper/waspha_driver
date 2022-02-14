// @flow

import {TRIP_STATUS_LOADER} from './ActionTypes';

export function tripStatusLoader(payload, responseCallback) {
  return {
    payload,
    type: TRIP_STATUS_LOADER,
  };
}
