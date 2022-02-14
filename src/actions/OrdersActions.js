import {GET_ORDERS, ORDER_REQUEST,  GET_ACTIVE_ORDERS
} from './ActionTypes';

export function getOrdersRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ORDERS.REQUEST,
  };
}

export function getOrdersSuccess(data) {
  return {
    data,
    type: GET_ORDERS.SUCCESS,
  };
}

export function orderReqRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ORDER_REQUEST.REQUEST,
  };
}

export function orderReqSuccess(data) {
  return {
    data,
    type: ORDER_REQUEST.SUCCESS,
  };
}


export function getActiveOrdersRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ACTIVE_ORDERS.REQUEST,
  };
}

export function getActiveOrdersSuccess(data) {
  return {
    data,
    type: GET_ACTIVE_ORDERS.SUCCESS,
  };
}