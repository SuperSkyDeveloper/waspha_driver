import _ from 'lodash';
import Util from '../util';
// export const BASE_URL = 'https://waspha-staging.herokuapp.com/driver/';
// export const BASE_URL = 'https://waspha-production.herokuapp.com/driver/';
export const BASE_URL = 'https://api.waspha.com/driver/';
// export const TRACKING_BASE_URL =
//   'https://waspha-tracking-dev.herokuapp.com/app/tracking';

export const TRACKING_BASE_URL = 'https://tracking.waspha.com/app/tracking';

export const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/';

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};
export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const USER_SIGNIN = {
  route: 'login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNUP = {
  route: 'signup-request',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const USER_CONFIRM_OTP = {
  route: 'signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const USER_FORGOT_PASSWORD = {
  route: 'forget-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const VERIFY_RESET_PASSWORD = {
  route: 'verify-reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_ONLINE_STATUS = {
  route: 'change-online-status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const RESEND_OTP = {
  route: 'resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const FAQS = {
  route: 'faq-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const RESET_PASSWORD = {
  route: 'reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_PASSWORD = {
  route: 'change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_PROFILE_DETAIL = {
  route: 'profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_TRIPS = {
  route: 'chrome',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const TRIPS_EARNING = {
  route: 'trips-earnings',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EARNINGS = {
  route: 'earnings',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ORDER_REQUEST = {
  route: 'order-request',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ORDERS = {
  route: 'chrome',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_REQUESTS = {
  route: 'order-request',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CANCEL_ORDER = {
  route: 'cancel-order-request',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ACCEPT_ORDER = {
  route: 'respond-order-request',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_TO_WALLET = {
  route: 'add-to-wallet',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const REVIEWS_RATINGS = {
  route: 'create-review-rating',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_RIDE_STATUS = {
  route: 'change-ride-status',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const APP_SETTINGS = {
  route: 'app-settings',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CONTACT_US = {
  route: 'submit-contact-us',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_LANGUAGE = {
  route: 'change-language',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_TRANSLATIONS = {
  route: 'translations',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const TRIPS_AND_ORDERS = {
  route: 'trips-n-orders',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_RATINGS = {
  route: 'reviews-ratings',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPLOAD_IMAGE = {
  route: 'waspha/upload',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_COOKIE_POLICY = {
  route: 'waspha-cookie-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_COPY_RIGHT_POLICY = {
  route: 'waspha-copyright-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_PRIVACY_POLICY = {
  route: 'waspha-privacy-policy',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_TERMS_AND_CONDITION = {
  route: 'waspha-terms-n-conditions',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_GDPR_COMPLIANCE_STATEMENT = {
  route: 'waspha-gdpr-compliance',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_DEVICE_ID = {
  route: 'device-token',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_NOTIFICATIONS_LIST = {
  route: 'notification-listing',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const IS_ORDER_RATED = {
  route: 'is-order-rated',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ACTIVE_ORDERS = {
  route: 'active-orders',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_AVATAR = {
  route: 'update-avatar',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_FIXED_ZONE_REGIONS = {
  route: 'avatar',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SAVE_ZONE = {
  route: 'save-zone',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_USER_PROFILE = {
  route: 'edit-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_EMAIL_OR_PHONE = {
  route: 'change-contact-or-email',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_EMAIL_OR_PHONE_OTP = {
  route: 'verify-contact-or-email',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};
