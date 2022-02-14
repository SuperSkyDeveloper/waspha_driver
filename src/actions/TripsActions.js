import {EARNINGS, GET_TRIPS, TRIPS_EARNING} from './ActionTypes';

export function getTripsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_TRIPS.REQUEST,
  };
}

export function getTripsSuccess(data) {
  return {
    data,
    type: GET_TRIPS.SUCCESS,
  };
}

export function tripsEarningRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: TRIPS_EARNING.REQUEST,
  };
}

export function tripsEarningSuccess(data) {
  return {
    data,
    type: TRIPS_EARNING.SUCCESS,
  };
}

export function earningsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EARNINGS.REQUEST,
  };
}

export function earningsSuccess(data) {
  return {
    data,
    type: EARNINGS.SUCCESS,
  };
}
