import {take, put, call, fork} from 'redux-saga/effects';
import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP,
  RESEND_OTP,
  VERIFY_RESET_PASSWORD,
  RESET_PASSWORD,
  CHANGE_ONLINE_STATUS,
  CHANGE_PASSWORD,
  GET_PROFILE_DETAIL,
  UPLOAD_DOCUMENTS,
  UPDATE_AVATAR,
  UPDATE_USER_PROFILE,
  CHANGE_EMAIL_OR_PHONE,
  CHANGE_EMAIL_OR_PHONE_OTP,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {
  userSignupSuccess,
  userSigninSuccess,
  userSignOutSuccess,
  forgotPasswordSuccess,
  resendOtpSuccess,
  userConfirmOptSuccess,
  verifyResetPasswordSuccess,
  changeOnlineStatusSuccess,
  changePasswordSuccess,
  getProfileDetailSuccess,
  updateUserData,
  updateUserProfileSuccess,
  changeEmailOrPhoneOTPSuccess,
  changeEmailOrPhoneSuccess,
} from '../actions/UserActions';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  RESET_PASSWORD as RESET_PASSWORD_URL,
  USER_CONFIRM_OTP as USER_CONFIRM_OTP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  RESEND_OTP as RESEND_OTP_URL,
  VERIFY_RESET_PASSWORD as VERIFY_RESET_PASSWORD_URL,
  CHANGE_ONLINE_STATUS as CHANGE_ONLINE_STATUS_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  CHANGE_PASSWORD as CHANGE_PASSWORD_URL,
  GET_PROFILE_DETAIL as GET_PROFILE_DETAIL_URL,
  UPLOAD_IMAGE as UPLOAD_IMAGE_URL,
  UPDATE_AVATAR as UPDATE_AVATAR_URL,
  UPDATE_USER_PROFILE as UPDATE_USER_PROFILE_URL,
  CHANGE_EMAIL_OR_PHONE as CHANGE_EMAIL_OR_PHONE_URL,
  CHANGE_EMAIL_OR_PHONE_OTP as CHANGE_EMAIL_OR_PHONE_OTP_URL,
  callRequest,
  CLOUDINARY_URL,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {alertMessage} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSignupSuccess(response.data));
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

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSigninSuccess(response.data));
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

function* updateAvatar() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_AVATAR.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_AVATAR_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(updateUserData(response.data));
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* resendOtp() {
  while (true) {
    const {payload, responseCallback} = yield take(RESEND_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(resendOtpSuccess(response.data));
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

function* signout() {
  while (true) {
    const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(userSignOutSuccess());
      } else {
        if (responseCallback) responseCallback(response.status);
        yield put(userSignOutSuccess());
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      yield put(userSignOutSuccess());
    }
  }
}

function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(forgotPasswordSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        //util.topAlert(response.message || strings.SOMETHING_WENT_WRONG);
        yield put(
          alertMessage(response.message || strings.SOMETHING_WENT_WRONG),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
    }
  }
}

function* verifyResetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      VERIFY_RESET_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        VERIFY_RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeOnlineStatusSuccess(response.data));
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

function* confirmOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_CONFIRM_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_CONFIRM_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userConfirmOptSuccess(response.data));
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

function* resetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userConfirmOptSuccess(response.data));
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

// change phone and email start

function* changeEmailOrPhone() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_EMAIL_OR_PHONE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_OR_PHONE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(changeEmailOrPhoneSuccess(response.data));

        if (responseCallback) responseCallback(response);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

function* changeEmailOrPhoneOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_EMAIL_OR_PHONE_OTP.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_OR_PHONE_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeEmailOrPhoneOTPSuccess(response.data));

        if (responseCallback) responseCallback(response.status);
      } else {
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      //util.topAlert(strings.SOMETHING_WENT_WRONG)
      yield put(alertMessage(strings.SOMETHING_WENT_WRONG));
    }
  }
}

//change phone and email end

function* changeOnlineStatus() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_ONLINE_STATUS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_ONLINE_STATUS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changeOnlineStatusSuccess(response.data));
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
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

function* changePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changePasswordSuccess(response.data));
        //util.topAlert(response.message);
        yield put(alertMessage(response.message));
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

function* getProfileDetail() {
  while (true) {
    const {responseCallback} = yield take(GET_PROFILE_DETAIL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE_DETAIL_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getProfileDetailSuccess(response.data));
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

function* uploadDocuments() {
  while (true) {
    const {payload, responseCallback} = yield take(UPLOAD_DOCUMENTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPLOAD_IMAGE_URL,
        payload,
        '',
        {
          Accept: 'multipart/form-data',
        },
        ApiSauce,
        CLOUDINARY_URL,
      );

      if (response.secure_url) {
        if (responseCallback) responseCallback(true, response);
      } else {
        if (responseCallback) responseCallback(false, {});
        alert(ERROR_SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateUserProfileSuccess(response.data));
        //util.topAlert(response.message);
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
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

export default function* root() {
  yield fork(changeOnlineStatus);
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
  yield fork(forgotPassword);
  yield fork(resetPassword);
  yield fork(confirmOTP);
  yield fork(resendOtp);
  yield fork(verifyResetPassword);
  yield fork(changePassword);
  yield fork(getProfileDetail);
  yield fork(uploadDocuments);
  yield fork(updateAvatar);
  yield fork(updateUserProfile);
  yield fork(changeEmailOrPhone);
  yield fork(changeEmailOrPhoneOTP);
}
