import {take, put, call, fork} from 'redux-saga/effects';
import {
  ACCEPT_ORDER,
  ADD_TO_WALLET,
  CANCEL_ORDER,
  CHANGE_RIDE_STATUS,
  GET_REQUESTS,
  IS_ORDER_RATED,
  REVIEWS_RATINGS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  GET_REQUESTS as GET_REQUESTS_URL,
  CANCEL_ORDER as CANCEL_ORDER_URL,
  ACCEPT_ORDER as ACCEPT_ORDER_URL,
  ADD_TO_WALLET as ADD_TO_WALLET_URL,
  REVIEWS_RATINGS as REVIEWS_RATINGS_URL,
  CHANGE_RIDE_STATUS as CHANGE_RIDE_STATUS_URL,
  IS_ORDER_RATED as IS_ORDER_RATED_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  acceptOrderSuccess,
  addToWalletSuccess,
  cancelOrderSuccess,
  changeRideStatusSuccess,
  getRequestsSuccess,
  isOrderRatedSuccess,
  reviewsRatingsSuccess,
} from '../actions/RequestsActions';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getRequests() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_REQUESTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_REQUESTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getRequestsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* cancelOrder() {
  while (true) {
    const {payload, responseCallback} = yield take(CANCEL_ORDER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CANCEL_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(cancelOrderSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* acceptOrder() {
  while (true) {
    const {payload, responseCallback} = yield take(ACCEPT_ORDER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ACCEPT_ORDER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(acceptOrderSuccess(response.status));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* changeRideStatus() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_RIDE_STATUS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_RIDE_STATUS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeRideStatusSuccess(payload.status));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* addToWallet() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_TO_WALLET.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_TO_WALLET_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addToWalletSuccess(response.status));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* reviewsRatings() {
  while (true) {
    const {payload, responseCallback} = yield take(REVIEWS_RATINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REVIEWS_RATINGS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(reviewsRatingsSuccess(response.status));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* isOrderRated() {
  while (true) {
    const {payload, responseCallback} = yield take(IS_ORDER_RATED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        IS_ORDER_RATED_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(isOrderRatedSuccess(response.data.is_rated));

        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(strings.SOMETHING_WENT_WRONG);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

export default function* root() {
  yield fork(acceptOrder);
  yield fork(cancelOrder);
  yield fork(getRequests);
  yield fork(addToWallet);
  yield fork(reviewsRatings);
  yield fork(changeRideStatus);
  yield fork(isOrderRated);
}
