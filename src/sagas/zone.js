import {take, put, call, fork} from 'redux-saga/effects';
import {SAVE_ZONE} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {SAVE_ZONE as SAVE_ZONE_URL, callRequest} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';

import {alertMessage} from '../actions/GeneralActions';
import {updateUserData} from '../actions/UserActions';

function* saveZone() {
  while (true) {
    const {payload, responseCallback} = yield take(SAVE_ZONE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SAVE_ZONE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(updateUserData({...payload, is_zone_selected: true}));
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

export default function* root() {
  yield fork(saveZone);
}
