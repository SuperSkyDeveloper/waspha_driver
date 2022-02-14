import {take, put, call, fork} from 'redux-saga/effects';
import {GET_TRIPS, TRIPS_EARNING, EARNINGS} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  GET_TRIPS as GET_TRIPS_URL,
  TRIPS_EARNING as TRIPS_EARNING_URL,
  EARNINGS as EARNINGS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  earningsRequest,
  earningsSuccess,
  getTripsSuccess,
  tripsEarningSuccess,
} from '../actions/TripsActions';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getTrips() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_TRIPS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_TRIPS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(response.data);
        yield put(getTripsSuccess(response.data));
      } else {
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

function* tripsEarning() {
  while (true) {
    const {payload, responseCallback} = yield take(TRIPS_EARNING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TRIPS_EARNING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(tripsEarningSuccess(response.data));
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

function* earnings() {
  while (true) {
    const {payload, responseCallback} = yield take(EARNINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EARNINGS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(earningsSuccess(response.data));
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
  yield fork(getTrips);
  yield fork(tripsEarning);
  yield fork(earnings);
}
