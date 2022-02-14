import {
  ACCEPT_ORDER,
  ADD_TO_WALLET,
  CANCEL_ORDER,
  CHANGE_RIDE_STATUS,
  GET_REQUESTS,
  REVIEWS_RATINGS,
  IS_ORDER_RATED,
} from './ActionTypes';

export function getRequestsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_REQUESTS.REQUEST,
  };
}

export function getRequestsSuccess(data) {
  return {
    data,
    type: GET_REQUESTS.SUCCESS,
  };
}

export function cancelOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CANCEL_ORDER.REQUEST,
  };
}

export function cancelOrderSuccess(data) {
  return {
    data,
    type: CANCEL_ORDER.SUCCESS,
  };
}

export function acceptOrderRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ACCEPT_ORDER.REQUEST,
  };
}

export function acceptOrderSuccess(data) {
  return {
    data,
    type: ACCEPT_ORDER.SUCCESS,
  };
}

export function changeRideStatusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_RIDE_STATUS.REQUEST,
  };
}

export function changeRideStatusSuccess(data) {
  return {
    data,
    type: CHANGE_RIDE_STATUS.SUCCESS,
  };
}

export function addToWalletRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_TO_WALLET.REQUEST,
  };
}

export function addToWalletSuccess(data) {
  return {
    data,
    type: ADD_TO_WALLET.SUCCESS,
  };
}

export function reviewsRatingsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REVIEWS_RATINGS.REQUEST,
  };
}

export function reviewsRatingsSuccess(data) {
  return {
    data,
    type: REVIEWS_RATINGS.SUCCESS,
  };
}

export function isOrderRatedRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: IS_ORDER_RATED.REQUEST,
  };
}

export function isOrderRatedSuccess(data) {
  return {
    data,
    type: IS_ORDER_RATED.SUCCESS,
  };
}
