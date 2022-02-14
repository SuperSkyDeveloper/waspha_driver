import {take, put, call, fork} from 'redux-saga/effects';
import {TRIPS_AND_ORDERS} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  TRIPS_AND_ORDERS as TRIPS_AND_ORDERS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {tripsAndOrdersSuccess} from '../actions/TripsAndOrdersActions';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* tripsAndOrders() {
  while (true) {
    const {payload, responseCallback} = yield take(TRIPS_AND_ORDERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TRIPS_AND_ORDERS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(tripsAndOrdersSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

export default function* root() {
  yield fork(tripsAndOrders);
}
