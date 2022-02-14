// @flow

import {
  APP_SETTINGS,
  CHANGE_LANGUAGE,
  CONTACT_US,
  FAQS,
  FIRST_TIME_OPEN,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_GDPR_COMPLIANCE_STATEMENT,
  GET_PRIVACY_POLICY,
  GET_TERMS_AND_CONDITION,
  GET_RATINGS,
  UPDATE_DEVICE_ID,
  GET_NOTIFICATIONS_LIST,
  GET_TRANSLATIONS,
  ALERT_MESSAGE,
  GET_FIXED_ZONE_REGIONS,
  SET_COUNTRY_CODE,
} from './ActionTypes';

export function request() {
  return {
    type: EMPTY.REQUEST,
  };
}

export function appSettingsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APP_SETTINGS.REQUEST,
  };
}

export function appSettingsSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: APP_SETTINGS.SUCCESS,
  };
}

export function faqsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FAQS.REQUEST,
  };
}

export function faqsSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: FAQS.SUCCESS,
  };
}

export function contactUsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_US.REQUEST,
  };
}

export function contactUsSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: CONTACT_US.SUCCESS,
  };
}

export function changeLanguageRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_LANGUAGE.REQUEST,
  };
}

export function changeLanguageSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: CHANGE_LANGUAGE.SUCCESS,
  };
}

export function setFirstTime() {
  return {
    type: FIRST_TIME_OPEN,
  };
}

export function getCookiePolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_COOKIE_POLICY.REQUEST,
  };
}
export function getCookiePolicySuccess(data) {
  return {
    data,
    type: GET_COOKIE_POLICY.SUCCESS,
  };
}

export function getCopyRightPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_COPY_RIGHT_POLICY.REQUEST,
  };
}
export function getCopyRightPolicySuccess(data) {
  return {
    data,
    type: GET_COPY_RIGHT_POLICY.SUCCESS,
  };
}

export function getTermsAndConditionRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TERMS_AND_CONDITION.REQUEST,
  };
}
export function getTermsAndConditionSuccess(data) {
  return {
    data,
    type: GET_TERMS_AND_CONDITION.SUCCESS,
  };
}

export function getPrivacyPolicyRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PRIVACY_POLICY.REQUEST,
  };
}
export function getPrivacyPolicySuccess(data) {
  return {
    data,
    type: GET_PRIVACY_POLICY.SUCCESS,
  };
}

export function getGDPRComplianceStatementrRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_GDPR_COMPLIANCE_STATEMENT.REQUEST,
  };
}
export function getGDPRComplianceStatementSuccess(data) {
  return {
    data,
    type: GET_GDPR_COMPLIANCE_STATEMENT.SUCCESS,
  };
}
export function getRatingsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_RATINGS.REQUEST,
  };
}

export function getRatingSuccess(data) {
  return {
    data,
    type: GET_RATINGS.SUCCESS,
  };
}
export function updateDeviceTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_DEVICE_ID.REQUEST,
  };
}
export function updateDeviceTokenSuccess(data) {
  return {
    data,
    type: UPDATE_DEVICE_ID.SUCCESS,
  };
}

export function getNotificationsListRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_NOTIFICATIONS_LIST.REQUEST,
  };
}
export function getNotificationsListSuccess(data) {
  return {
    data,
    type: GET_NOTIFICATIONS_LIST.SUCCESS,
  };
}
export function getTranslationsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_TRANSLATIONS.REQUEST,
  };
}

export function getTranslationsSuccess(data) {
  return {
    data,
    type: GET_TRANSLATIONS.SUCCESS,
  };
}

export function getFixedZoneRegionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_FIXED_ZONE_REGIONS.REQUEST,
  };
}

export function getFixedZoneRegionsSuccess(data) {
  return {
    data,
    type: GET_FIXED_ZONE_REGIONS.SUCCESS,
  };
}

export function alertMessage(data) {
  return {
    data,
    type: ALERT_MESSAGE,
  };
}

export function setCountryCode(data) {
  return {
    data,
    type: SET_COUNTRY_CODE,
  };
}
