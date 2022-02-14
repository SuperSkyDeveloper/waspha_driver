// @flow

import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP_FGPASS,
  USER_UPDATE_PASSWORD,
  CONTACT_ADMIN,
  GET_PROFILE_SECTIONS,
  POST_PROFILE_DATA,
  DELETE_PROFILE_SUBSECTION_DATA,
  SET_USER_DATA,
  USER_CONFIRM_OTP,
  REMEMBER_ME,
  RESEND_OTP,
  VERIFY_RESET_PASSWORD,
  RESET_PASSWORD,
  CHANGE_ONLINE_STATUS,
  CHANGE_PASSWORD,
  GET_PROFILE_DETAIL,
  UPLOAD_DOCUMENTS,
  UPDATE_AVATAR,
  UPDATE_USER_DATA,
  REFRESH_TOKEN,
  UPDATE_IN_REGION,
  CHANGE_EMAIL_OR_PHONE_OTP,
  CHANGE_EMAIL_OR_PHONE,
} from './ActionTypes';

export function changePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD.REQUEST,
  };
}

export function changePasswordSuccess(data) {
  return {
    data,
    type: CHANGE_PASSWORD.SUCCESS,
  };
}

export function changeOnlineStatusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_ONLINE_STATUS.REQUEST,
  };
}

export function changeOnlineStatusSuccess(data) {
  return {
    data,
    type: CHANGE_ONLINE_STATUS.SUCCESS,
  };
}

export function resendOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESEND_OTP.REQUEST,
  };
}

export function resendOtpSuccess(data) {
  return {
    data,
    type: RESEND_OTP.SUCCESS,
  };
}
export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS,
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data, access_token, save_token) {
  return {
    data,
    access_token,
    save_token,
    type: USER_SIGNIN.SUCCESS,
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function updateUserProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_USER_PROFILE.REQUEST,
  };
}

export function updateUserProfileSuccess(data) {
  return {
    data,
    type: UPDATE_USER_PROFILE.SUCCESS,
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    data,
    type: USER_FORGOT_PASSWORD.SUCCESS,
  };
}

export function confirmOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CONFIRM_OTP_FGPASS.REQUEST,
  };
}

export function updatePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_UPDATE_PASSWORD.REQUEST,
  };
}

export function contactAdminRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_ADMIN.REQUEST,
  };
}

export function getProfileSectionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PROFILE_SECTIONS.REQUEST,
  };
}

export function getProfileSectionsSuccess(data) {
  return {
    data,
    type: GET_PROFILE_SECTIONS.SUCCESS,
  };
}

export function userConfirmOptRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CONFIRM_OTP.REQUEST,
  };
}

export function userConfirmOptSuccess(data) {
  return {
    data,
    type: USER_CONFIRM_OTP.SUCCESS,
  };
}

export function resetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESET_PASSWORD.REQUEST,
  };
}

export function resetPasswordSuccess(data) {
  return {
    data,
    type: RESET_PASSWORD.SUCCESS,
  };
}
export function verifyResetPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VERIFY_RESET_PASSWORD.REQUEST,
  };
}

export function verifyResetPasswordSuccess(data) {
  return {
    data,
    type: VERIFY_RESET_PASSWORD.SUCCESS,
  };
}

export function postProfileDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_PROFILE_DATA.REQUEST,
  };
}

export function deleteProfileSubSectionDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
  };
}

export function setUserData(data) {
  return {
    data,
    type: SET_USER_DATA,
  };
}

export function rememberMe(data) {
  return {
    data,
    type: REMEMBER_ME,
  };
}

export function getProfileDetailRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PROFILE_DETAIL.REQUEST,
  };
}
export function getProfileDetailSuccess(data) {
  return {
    data,
    type: GET_PROFILE_DETAIL.SUCCESS,
  };
}

export function uploadDocumentsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPLOAD_DOCUMENTS.REQUEST,
  };
}
export function uploadDocumentsSuccess(data) {
  return {
    data,
    type: UPLOAD_DOCUMENTS.SUCCESS,
  };
}

export function updateAvatarRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_AVATAR.REQUEST,
  };
}

export function updateAvatarSuccess(data) {
  return {
    data,
    type: UPDATE_AVATAR.SUCCESS,
  };
}

export function updateUserData(data, responseCallback = () => {}) {
  return {
    data,
    responseCallback,
    type: UPDATE_USER_DATA.SUCCESS,
  };
}

export function changeEmailOrPhoneRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL_OR_PHONE.REQUEST,
  };
}

export function changeEmailOrPhoneSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL_OR_PHONE.SUCCESS,
  };
}

export function changeEmailOrPhoneOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL_OR_PHONE_OTP.REQUEST,
  };
}

export function changeEmailOrPhoneOTPSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL_OR_PHONE_OTP.SUCCESS,
  };
}

export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN,
  };
}

export function updateInRegion(data) {
  return {
    data,
    type: UPDATE_IN_REGION,
  };
}
