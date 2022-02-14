import {TRIPS_AND_ORDERS} from './ActionTypes';

export function tripsAndOrdersRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: TRIPS_AND_ORDERS.REQUEST,
  };
}

export function tripsAndOrdersSuccess(data) {
  return {
    data,
    type: TRIPS_AND_ORDERS.SUCCESS,
  };
}
