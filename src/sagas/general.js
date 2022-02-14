import _ from 'lodash';
import {take, put, call, fork} from 'redux-saga/effects';
import {
  APP_SETTINGS,
  CONTACT_US,
  FAQS,
  CHANGE_LANGUAGE,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_TERMS_AND_CONDITION,
  GET_GDPR_COMPLIANCE_STATEMENT,
  GET_PRIVACY_POLICY,
  GET_RATINGS,
  UPDATE_DEVICE_ID,
  GET_NOTIFICATIONS_LIST,
  GET_TRANSLATIONS,
  GET_FIXED_ZONE_REGIONS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  appSettingsSuccess,
  changeLanguageSuccess,
  faqsSuccess,
  getCookiePolicySuccess,
  getCopyRightPolicySuccess,
  getTermsAndConditionSuccess,
  getGDPRComplianceStatementSuccess,
  getPrivacyPolicySuccess,
  getRatingSuccess,
  getNotificationsListSuccess,
  getTranslationsSuccess,
  alertMessage,
  getFixedZoneRegionsSuccess,
} from '../actions/GeneralActions';

import {
  APP_SETTINGS as APP_SETTINGS_URL,
  CONTACT_US as CONTACT_US_URL,
  CHANGE_LANGUAGE as CHANGE_LANGUAGE_URL,
  UPDATE_DEVICE_ID as UPDATE_DEVICE_ID_URL,
  FAQS as FAQS_URL,
  GET_COOKIE_POLICY as GET_COOKIE_POLICY_URL,
  GET_COPY_RIGHT_POLICY as GET_COPY_RIGHT_POLICY_URL,
  GET_TERMS_AND_CONDITION as GET_TERMS_AND_CONDITION_URL,
  GET_PRIVACY_POLICY as GET_PRIVACY_POLICY_URL,
  GET_GDPR_COMPLIANCE_STATEMENT as GET_GDPR_COMPLIANCE_STATEMENT_URL,
  GET_RATINGS as GET_RATINGS_URL,
  GET_NOTIFICATIONS_LIST as GET_NOTIFICATIONS_LIST_URL,
  GET_TRANSLATIONS as GET_TRANSLATIONS_URL,
  GET_FIXED_ZONE_REGIONS as GET_FIXED_ZONE_REGIONS_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* appSetting() {
  while (true) {
    const {payload, responseCallback} = yield take(APP_SETTINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APP_SETTINGS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(appSettingsSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);

        // util.alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      // util.topAlertError(err.message);
    }
  }
}

function* getFixedZoneRegions() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_FIXED_ZONE_REGIONS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_FIXED_ZONE_REGIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getFixedZoneRegionsSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);

        // util.alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      // util.topAlertError(err.message);
    }
  }
}

function* faqs() {
  while (true) {
    const {payload, responseCallback} = yield take(FAQS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        FAQS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(faqsSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* contactUsRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_US.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_US_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(faqsSuccess(response.data));
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        ////util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* changeLanguage() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_LANGUAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_LANGUAGE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeLanguageSuccess(payload.language));
        util.switchLanguage(payload.language);

        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getCookiePolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_COOKIE_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_COOKIE_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getCookiePolicySuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getCopyRightPolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_COPY_RIGHT_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_COPY_RIGHT_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getCopyRightPolicySuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTermsAndCondition() {
  while (true) {
    const {responseCallback} = yield take(GET_TERMS_AND_CONDITION.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_TERMS_AND_CONDITION_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getTermsAndConditionSuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getPrivacyPolicy() {
  while (true) {
    const {responseCallback} = yield take(GET_PRIVACY_POLICY.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_PRIVACY_POLICY_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getPrivacyPolicySuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getGDPRComplianceStatement() {
  while (true) {
    const {responseCallback} = yield take(
      GET_GDPR_COMPLIANCE_STATEMENT.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        GET_GDPR_COMPLIANCE_STATEMENT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getGDPRComplianceStatementSuccess(
            util.isRTL() ? response.data.ar : response.data.en,
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getRatings() {
  while (true) {
    const {responseCallback} = yield take(GET_RATINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_RATINGS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getRatingSuccess(response.data.reviews_ratings));

        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(getRatingSuccess(response.data.reviews_ratings));

        if (responseCallback) responseCallback(response.status);
        //util.topAlert(strings.SOMETHING_WENT_WRONG);
        yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* updateDeviceToken() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_DEVICE_ID.REQUEST);

    try {
      const response = yield call(
        callRequest,
        UPDATE_DEVICE_ID_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(updateDeviceTokenSuccess(response));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(false);
        // alert(response.message || 'Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);

      // alert(util.getErrorText(err.message));
    }
  }
}

function* getNotificationsList() {
  while (true) {
    const {responseCallback} = yield take(GET_NOTIFICATIONS_LIST.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS_LIST_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getNotificationsListSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        yield put(getNotificationsListSuccess(response.data));

        if (responseCallback) responseCallback(false);
        // alert(response.message || 'Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* getTranslations() {
  while (true) {
    const {responseCallback} = yield take(GET_TRANSLATIONS.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_TRANSLATIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTranslationsSuccess(response.data));

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
  yield fork(faqs);
  yield fork(changeLanguage);
  yield fork(getCookiePolicy);
  yield fork(getCopyRightPolicy);
  yield fork(getTermsAndCondition);
  yield fork(getPrivacyPolicy);
  yield fork(getGDPRComplianceStatement);
  yield fork(getRatings);
  yield fork(contactUsRequest);
  yield fork(updateDeviceToken);
  yield fork(appSetting);
  yield fork(getNotificationsList);
  yield fork(getTranslations);
  yield fork(getFixedZoneRegions);
}
