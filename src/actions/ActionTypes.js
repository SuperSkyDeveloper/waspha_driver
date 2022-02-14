// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const UPDATE_USER_PROFILE = createRequestTypes('UPDATE_USER_PROFILE');
export const USER_CONFIRM_OTP = createRequestTypes('USER_CONFIRM_OTP');
export const VERIFY_RESET_PASSWORD = createRequestTypes(
  'VERIFY_RESET_PASSWORD',
);
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');

export const USER_UPDATE_PASSWORD = createRequestTypes('USER_UPDATE_PASSWORD');
export const CONTACT_ADMIN = createRequestTypes('CONTACT_ADMIN');
export const GET_SERVICE_TYPES = createRequestTypes('GET_SERVICE_TYPES');
export const GET_NEARBY_SERVICE_PROVIDERS = createRequestTypes(
  'GET_NEARBY_SERVICE_PROVIDERS',
);
export const CLEAR_SERVICE_PROVIDERS_DATA = 'CLEAR_SERVICE_PROVIDERS_DATA';
export const GET_NEWS = createRequestTypes('GET_NEWS');
export const GET_EVENTS = createRequestTypes('GET_EVENTS');
export const GET_MONTLY_EVENTS = createRequestTypes('GET_MONTLY_EVENTS');
export const GET_SEARCH_EVENTS = createRequestTypes('GET_SEARCH_EVENTS');
export const GET_ORGANIZATIONS = createRequestTypes('GET_ORGANIZATIONS');
export const GET_REVIEWS = createRequestTypes('GET_REVIEWS');
export const GET_TRIPS = createRequestTypes('GET_TRIPS');
export const GET_ORDERS = createRequestTypes('GET_ORDERS');
export const GET_REQUESTS = createRequestTypes('GET_REQUESTS');
export const APP_SETTINGS = createRequestTypes('APP_SETTINGS');
export const GET_PROFILE_SECTIONS = createRequestTypes('GET_PROFILE_SECTIONS');
export const POST_PROFILE_DATA = createRequestTypes('POST_PROFILE_DATA');
export const SET_USER_DATA = createRequestTypes('SET_USER_DATA');
export const DELETE_PROFILE_SUBSECTION_DATA = createRequestTypes(
  'DELETE_PROFILE_SUBSECTION_DATA',
);

export const CHAT_LISTING = createRequestTypes('CHAT_LISTING');

export const GET_BRAIN_TREE_TOKEN = createRequestTypes('GET_BRAIN_TREE_TOKEN');
export const BRAIN_TREE_PAYMENT = createRequestTypes('BRAIN_TREE_PAYMENT');
export const LOGOUT = 'LOGOUT';

export const EMPTY = createRequestTypes('EMPTY');
export const REMEMBER_ME = 'REMEMBER_ME';

//
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const CHANGE_ONLINE_STATUS = createRequestTypes('CHANGE_ONLINE_STATUS');
export const FAQS = createRequestTypes('FAQS');
export const CONTACT_US = createRequestTypes('CONTACT_US');
export const CHANGE_LANGUAGE = createRequestTypes('CHANGE_LANGUAGE');
export const TRIPS_EARNING = createRequestTypes('TRIPS_EARNING');
export const FIRST_TIME_OPEN = 'FIRST_TIME_OPEN';
export const TRIPS_AND_ORDERS = createRequestTypes('TRIPS_AND_ORDERS');
export const ORDER_REQUEST = createRequestTypes('ORDER_REQUEST');
export const CANCEL_ORDER = createRequestTypes('CANCEL_ORDER');
export const ACCEPT_ORDER = createRequestTypes('ACCEPT_ORDER');
export const CHANGE_RIDE_STATUS = createRequestTypes('CHANGE_RIDE_STATUS');
export const ADD_TO_WALLET = createRequestTypes('ADD_TO_WALLET');
export const REVIEWS_RATINGS = createRequestTypes('REVIEWS_RATINGS');
export const GET_PROFILE_DETAIL = createRequestTypes('GET_PROFILE_DETAIL');
export const EARNINGS = createRequestTypes('EARNINGS');
export const UPLOAD_DOCUMENTS = createRequestTypes('UPLOAD_DOCUMENTS');
export const GET_RATINGS = createRequestTypes('GET_RATINGS');
export const UPDATE_DEVICE_ID = createRequestTypes('UPDATE_DEVICE_ID');
export const GET_NOTIFICATIONS_LIST = createRequestTypes(
  'GET_NOTIFICATIONS_LIST',
);

export const GET_ACTIVE_ORDERS = createRequestTypes('GET_ACTIVE_ORDERS');

// INTERNAL
export const TRIP_STATUS_LOADER = 'TRIP_STATUS_LOADER';

export const GET_COOKIE_POLICY = createRequestTypes('GET_COOKIE_POLICY');
export const GET_COPY_RIGHT_POLICY = createRequestTypes(
  'GET_COPY_RIGHT_POLICY',
);
export const GET_TERMS_AND_CONDITION = createRequestTypes(
  'GET_TERMS_AND_CONDITION',
);
export const GET_PRIVACY_POLICY = createRequestTypes('GET_PRIVACY_POLICY');
export const GET_GDPR_COMPLIANCE_STATEMENT = createRequestTypes(
  'GET_GDPR_COMPLIANCE_STATEMENT',
);
export const GET_TRANSLATIONS = createRequestTypes('GET_TRANSLATIONS');

export const UPDATE_AVATAR = createRequestTypes('UPDATE_AVATAR');
export const UPDATE_USER_DATA = createRequestTypes('UPDATE_USER_DATA');
export const IS_ORDER_RATED = createRequestTypes('IS_ORDER_RATED');
export const GET_FIXED_ZONE_REGIONS = createRequestTypes(
  'GET_FIXED_ZONE_REGIONS',
);
export const CHANGE_EMAIL_OR_PHONE = createRequestTypes(
  'CHANGE_EMAIL_OR_PHONE',
);
export const CHANGE_EMAIL_OR_PHONE_OTP = createRequestTypes(
  'CHANGE_EMAIL_OR_PHONE_OTP',
);

export const SAVE_ZONE = createRequestTypes('SAVE_ZONE');

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ALERT_MESSAGE = 'ALERT_MESSAGE';
export const UPDATE_IN_REGION = 'UPDATE_IN_REGION';
export const SET_COUNTRY_CODE = 'SET_COUNTRY_CODE';
