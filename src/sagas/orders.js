import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_ORDERS,
  ORDER_REQUEST,
  GET_ACTIVE_ORDERS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  getOrdersSuccess,
  orderReqSuccess,
  getActiveOrdersSuccess,
} from '../actions/OrdersActions';

import {
  GET_ORDERS as GET_ORDERS_URL,
  ORDER_REQUEST as ORDER_REQUEST_URL,
  GET_ACTIVE_ORDERS as GET_ACTIVE_ORDERS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getOrders() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_ORDERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ORDERS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) {
          responseCallback(response.data);
        }
        yield put(getOrdersSuccess(response.data));
      } else {
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) {
        responseCallback(null, err);
      }
    }
  }
}

function* orderRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(ORDER_REQUEST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ORDER_REQUEST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(orderReqSuccess(response.data));
        if (responseCallback) {
          responseCallback(true, null);
        }
      } else {
        if (responseCallback) {
          responseCallback(null, null);
        }
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) {
        responseCallback(null, err);
      }
    }
  }
}

function* getActiveOrders() {
  while (true) {
    const {responseCallback} = yield take(GET_ACTIVE_ORDERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ACTIVE_ORDERS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getActiveOrdersSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(getOrders);
  yield fork(orderRequest);
  yield fork(getActiveOrders);
}
