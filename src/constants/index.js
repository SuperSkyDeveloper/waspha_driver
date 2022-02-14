import LocalizedStrings from 'react-native-localization';
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const NAME_LENGTH = 100;
export const DESC_LENGTH = 1000;
export const AMOUNT_FIELD_LENGTH = 10;
export const LATITUDE_DELTA = 0.0922;
export const TAX_FIELD_LENGTH = 3;
export const DUMMY_TEXT =
  'sdfksdofsdl  isdjifsdjiofjisdj iofsdjkl fj k slfj klsjfklsdj';
export const LIST_ITEMS_COUNT = 3;
export const SPACE_LIMIT = 0.5;
// Text Fields limit
export const inputFieldsLimit = {
  mLimit100: 100,
  mLimit500: 500,
  mLimit1000: 1000,
};

export const BATTTERY_DOWN_LIMIT = 20;

export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  'Please allow notifications and get notified timely';

//flit notification Channel
export const NOTIFICATION_CHANNEL = {
  id: 'waspha-driver-channel',
  name: 'Waspha Driver Notifications',
};

export const strings = new LocalizedStrings({
  en: {
    REQUEST_NOT_FOUND: 'Request Not Found',
    PHONE_NUMBER: 'Phone Number',
    NO_NOTIFICATIONS_FOUND: 'No Notifications Found',
    VERIFICATION_CODE_SEND_ON: 'Verification code send on',
    MIN: 'min',
    LEFT: 'left',
    WEEKLY: 'Weekly',
    CODE: 'Code',
    PAYMENT_TYPE: 'Payment Type',
    PHONE: 'Phone',
    VEHICLE_DETAIL: 'Vehicle Detail',
    NO_REVIEWS_AVAILABLE: 'No Reviews Available',
    NUM_OF_TRIPS: 'Number of Trips',
    LEGAL: 'Legal',
    SETTINGS: 'Settings',
    IS: 'is',
    REQUIRED: 'required',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly',
    NEXT: 'Next',
    SKIP: 'Skip',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    WE_ARE: 'We are',
    WASPHA: 'WASPHA',
    WELCOME_PLEASE_LOGIN_TO_YOUR_ACCOUNT:
      'Welcome, Please login to your account',
    LOGIN: 'Login',
    TRIP_DETAILS: 'Trip Details',
    DONT_HAVE_AN_ACCOUNT: "Don't have an account? ",
    SIGNUP: 'Sign up',
    STAY_LOGGED_IN: 'Stay Logged In',
    FORGOT_PASSWORD: 'Forgot Password',
    USER_ID: 'User ID',
    SIGNUP_NOW: 'SIGN UP NOW',
    PLEASE_FILL_ACCOUNT_AND_CREATE_ACCOUNT:
      'Please fill the details and create account',
    FULL_NAME: 'Full Name',
    EMAIL_ID: 'Email-Id',
    PASSWORD: 'Password',
    RETYPE_PASSWORD: 'Re-Type Password',
    MOBILE_NO: 'MOBILE NO.',
    SHARE: 'Share',
    YOUR_REF_CODE: 'Your Referral Code',
    REFER_VIEW_ADVT_EARN: 'Refer.View Advts.Earn',
    BY_CONTINUING_I_CONFIRM_THAT_HAVE_READ_AGREE_TO_THE:
      'By continuing, I confirm that I have read & agree to the',
    TERMS_CONDITIONS: 'Terms & conditions',
    AND: 'and',
    REFERRAL_CODE: 'Referral Code',
    PRIVACY_POLICY: 'Privacy policy',
    ALREADY_HAVE_ACCOUNT: 'Already have an Account ?',
    ENTER_VALID_NUMBER: 'Enter Valid Number',
    PLEASE_ACCEPT_OUR_TERMS_AND_CONDITIONS:
      'Please accept our terms and conditions',
    EMAIL_IS_NOT_VALID: 'Email is not valid',
    CONTACT_NUMBER: 'Contact Number',
    RECOVERY: 'Recovery',
    FORGOT_YOUR_PASSWORD: 'Forgot Your Password ?',
    RECOVER_PASSWORD_USING_EMAIL: 'Recover password using Email\nOr Phone No.',
    EMAIL: 'EMAIL',
    CONTINUE: 'Continue',
    PHONE_NO: 'Phone No.',
    PASSWORD_LENGTH: 'Password must contain more than 5 characters',
    PASSWORD_NOT_MATCH: 'Password does not match ',
    PASSWORD_RESET: 'Password Reset',
    SUCCESSFULLY: 'Successfully',
    DONE: 'Done',
    RESET_YOUR_PASSWORD: 'Reset Your \nPassword',
    NEW_PASSWORD: 'New Password',
    ACCOUNT: 'Account',
    VERIFICATION: 'Verification',
    RECOVERY: 'Recovery',
    ENTER_VERIFICATION_CODE: 'Enter Verification Code',
    EDIT: 'Edit',
    EDIT_NUMBER: 'Edit Number',
    ENTER_CODE: 'Enter Code',
    RESEND_CODE: 'Resend Code',
    WAITING: 'Waiting',
    WAITING_FOR_YOUR_ACCOUNT_TO_BE_VERIFIED:
      'Waiting for your account to be verified by our authority.',
    VISIT_PROFILE: 'Visit profile?',
    LOGOUT: 'Logout',
    ADDRESS: 'ADDRESS',
    GENDER: 'Gender',
    UPLOAD_DOCUMENT: 'Upload Document',
    HAVING_PROBLEM: 'Having Problem?',
    TRY_AGAIN: 'Try Again',
    WASPHA_EXPRESS: 'WASPHA Express',
    ACTIVATE_NIGHT_MODE: 'Activate Night Mode',
    POINTS: 'Points',
    GO: 'GO',
    YOU_ARE_ONLINE: "You're Online",
    ONLINE_STATUS: 'Online Status',
    YOU_ARE_OFFLINE: "You're Offline",
    PLEASE_SELECT_GENDER: 'Please Select a gender',
    MALE: 'Male',
    FEMALE: 'Female',
    ORDER_REQUEST: 'Order Request',
    DECLINE: 'Decline',
    ACCEPT: 'Accept',
    VIEW_ORDER_DETAILS: 'View Order Details',
    VERSION: 'Version',
    CANCEL_ORDER: 'Cancel Order',
    WHY_CANCEL_ORDER: 'Why do you wish to cancel your order',
    ADD_DESCRP: 'Add Description',
    SUBMIT: 'Submit',
    ORDER_CODE: 'Order Code',
    PICK_UP_IN: 'Pick Up In',
    DELIVER_BEFORE: 'Deliver Before',
    LANDMARK: 'Landmark',
    MESSAGE: 'Message',
    SUBJECT: 'Subject',
    CONTACT_US: 'Contact Us',
    SUBJECT_HERE: 'Subject here',
    MESSAGE_HERE: 'Message here',
    SEND: 'Send',
    MESSAGE_HAS_BEEN_SENT_SUCCESSFULLY: 'Message has been sent successfully',
    YES: 'Yes',
    NO: 'NO',
    OK: 'OK',
    REFERRAL_DES:
      'Refer the Waspha App to your friends and family and earn money just by viewing advertisements and refer again',
    CHANGE_DELIVERY_MODE: 'Change Delivery Mode',
    CHAT_OPTION: 'Chat Option',
    USER: 'User',
    DELIVERY_GUY: 'Delivery Guy',
    GROUP_CHAT: 'Group Chat',
    GOOGLE_MAP: 'Google Map',
    WAZE_MAP: 'Waze Map',
    TRIPS_COMPLETED: ' Trips Completed',
    PHONE_NUMBER: 'Phone Number',
    PLEASE_GIVE_A_REASON: 'Please give a reason to cancel',
    CANCELLATION_CONFIRMED: 'Cancellation Confirmed',
    I_AM_AT_PICKUP: 'I am at pickup',
    ASK_PROVIDER_VERIFICATION_CODE: 'Ask Provider for Verification Code',
    CONFIRM: 'Confirm',
    CODE_REQUIRED: 'Code is required',
    RESET_PASSWORD: 'Reset Password',
    CURRENT_PASSWORD: 'Current Password',
    SAVE: 'Save',
    FAQ: 'faq',
    PICK_UP: 'I picked up',
    ITEM: 'Item',
    ITEMS: 'Items',
    DETAILS: 'Details',
    QTY: 'Qty',
    START_DELIVERY: 'Start delivery',
    I_AM_AT_DELIVERY: 'I am at delivery',
    CONFIRM_DELIVERY: 'Confirm Delivery',
    COLLECT_CASH: 'Collect Cash',
    RECIEVE_PAYMENT: 'Recieve Payment',
    CASH_ON_DELIVERY: 'Cash on delivery',
    CREDIT_CARD: 'Credit Card',
    CANCEL: 'Cancel',
    PLEASE_ENTER_AMOUNT: 'Please Enter Amount',
    PLEASE_ENTER_VALID_AMOUNT: 'Please Enter Valid Amount',
    ADD_TO_WALLET: 'Add to wallet',
    RETURN_CHANGE: 'Return Change',
    DELIVER: 'Deliver',
    PAYMENT_BREAKDOWN: 'Payment BreakDown',
    PAYMENT_AMOUNT: 'Payment Amount',
    ITEMS_SUBTOTAL: 'Items Subtotal',
    DISCOUNT: 'Discount',
    RATE: 'Rate',
    DISCOUNT_AMOUNT: 'Discount Amount',
    WASPHA_FEES: 'WASPHA Fees',
    WASPHA_FEES_AMOUNT: 'WASPHA Fees Amount',
    WAITING_TOLL: 'Waiting Toll',
    PARKING_CH: 'Parking Ch',
    DELIVERY_FEES: 'Delivery Fees',
    WASPHA_CASH_USED: 'WASPHA Cash Used',
    TOTAL_TO_BE_PAID: 'Total to be paid',
    LANGUAGES: 'Languages',
    SELECT_LANGUAGE: 'Select Language',
    RATING: 'Rating',
    RATINGS_LIST: 'Ratings List',

    PLEASE_RATE_MY_SERVICE: 'Please rate my service',
    PROVIDER: 'Provider',
    USER: 'User',
    THANKYOU: 'Thank you',
    THANKYOU_FOR_TRIP: 'Thank you for the trip',

    GLAD_YOU_HAD_GOOD_TRIP: 'We are glad that you had a good trip',
    ANY_COMMENTS: 'Any Comments',
    ENTER_TEXT_HERE: 'Enter Text here',
    ENGLISH: 'English',
    SELECT_DELIVERABLES_VEHICLES: 'Select Deliverable Vehicles',
    EVALUATE_WASPHA: 'Evaluate WASPHA',
    EST: 'Est',
    SIGN_OUT: 'Sign Out',
    VERIFIED: 'Verified',
    NOT_VERIFIED: 'Not Verified',
    EARNINGS: 'Earnings',
    DASHBOARD: 'Dashboard',
    NOTIFICATION: 'Notification',
    USER_NAME: 'User Name',
    ORDER_DETAILS: 'Order Details',
    STORE_NAME: 'Store Name',
    DELIVERY_TIME: 'Delivery Time',
    CASH_COLLECTED: 'Cash Collected',
    TODAY: 'Today',
    TRIPS: 'Trips',
    ONLINE_HRS: 'Online hrs',
    CASH_TRIP: 'Cash Trip',
    ORDER_DETAILS: 'Order Details',
    TRIP: 'Trip',
    RATING_LIST: 'Ratings List',
    CONFIRMATION: 'Confirmation',
    CONFIRMATION_CODE: 'Confirmation Code',
    AMOUNT_ENTERED_NOT_MATCHED:
      "The amount entered doesn't match the amount you were asked to collect",
    PASSWORD_CONTAIN_ONE_CAPITAL_LETTER_AND_ONE_NUMBER:
      'Password must contain one number and one letter',
    SEE_MORE: 'See More',
    VIEW_DETAILS: 'View Details',
    PROFILE: 'Profile',
    UPLOAD_DOCUMENT_HELP:
      'You can select your relevant documents which includes ID Cards, license etc.',
    I_PICKED_UP: 'I picked up',
    COOKIE_POLICY: 'Cookie Policy',
    COPY_RIGHT_POLICY: 'Copyright Policy',
    TERMS_AND_CONDITION: 'Terms & Condition',
    GDPR_COMPLIANCE_STATEMENT: 'GDPR Compliance Statement',
    CODE_SEND_SUCCESSFULLY: 'Code send successfully',
    ARABIC: 'Arabic',
    DATA_NOT_FOUND: 'Data Not Found',
    NO_INTERNET_CONNECTION:
      'No internet connection found Check your connection',
    TRY_AGAIN: 'Try Again',
    NO_COOKIE_POLICY_FOUND: 'No Cookie Policy Found',
    NO_COPY_RIGHT_FOUND: 'No Copy Right Policy Found',
    NO_TERMS_AND_CONDITION: 'No Terms & Condition',
    NO_GDPR_COMPLIANCE_STATEMENT_FOUND: 'No GDPR Compliance Statement Found',
    REVIEWS: 'Reviews',
    NO_PRIVACY_POLICY_FOUND: 'No Privacy Policy Found',
    VENDOR: 'Vendor',
    CUSTOMER: 'Customer',
    SELECT_IMAGE: 'Select Image',
    UPLOAD: 'Upload',
    UPLOAD_IMAGE: 'Upload Image',
    CAMERA: 'Camera',
    GALLERY: 'Gallery',
    CLOSE: 'Close',
    PLEASE_SELECT_AN_IMAGE: 'Please select an image',
    REMAINING_AMOUNT: 'Remaining Amount to return',
  },

  ar: {},
});

export const PASSWORD_PLACEHOLDER = '********';

export const APP_VERSION = '0.11.0';

export const FORGET_OPTION = {
  EMAIL: 'email',
  PH0NE: 'phone',
};

// date time formats
export const DATE_TIME_FORMAT = 'DD/MM/YY, hh:mm a';
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';

export const DATE_FORMAT2 = 'DD/MM/YYYY';
export const DATE_FORMAT3 = 'DD MMM, YYYY';
export const DATE_FORMAT4 = "ddd,DD MMM'YY";

export const TIME_FORMAT2 = 'hh:mm';
export const TIME_FORMAT = 'hh:mm a';

export const DATE_TIME = 'DD-MM-YYYY, hh:mm';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyAB4_6W1YjYTt0AMDuBmmgqMlQCefe45Wg';
export const GOOGLE_COUNTRY_APIKEY = 'AIzaSyDXD-qniR-L-VgIziA8K0C__wR5YJnY640';
export const PLACES_API_KEY = 'AIzaSyCYiK5W3N6Zf0t6z_dxIvVtRfLbYFthnv4';
export const TRACKING_KEY =
  '0c0dfaba718cd04fb4679be0fc1ed682e818e059d65a9ed68c1035f19152950a';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const GENDER_LIST = {
  MALE: 'male',
  FEMALE: 'female',
};

export const DRIVERS_TYPE = {
  ONLINE: 'online',
  WASPHA_EXPRESS: 'waspha_express',
};

export const PAYMENT_TYPE = {
  WALLET: 'wallet',
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CREDIT_CARD: 'card',
};

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const TRIP_TYPE = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  AT_PICKUP: 'at_pickup',
  PICKED_UP: 'picked_up',
  DELIVERY_STARTED: 'delivery_started',
  AT_DELIVERY: 'at_delivery',
  DELIVERY_CONFIRMED: 'delivery_confirmed',
  PAYMENT_RECEIVED: 'payment_received',
  ALREADY_PAID_DELIVERY_CONFIRMED: 'already_paid_delivery_confirmed',
};

export const earningFilter = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

export const NOTIFICATIONS = {
  ORDER_REQUEST_RECEIVED: 'order_request_received',
  REVIEW_RECEIVED: 'review_received',
  OUT_OF_RANGE: 'out_of_range',
  ORDER_CANCELLED: 'order_cancelled',
  CHAT_NOTIFICATION: 'message',
  LOYALTY_POINTS_UPDATED: 'loyalty_points_updated',
  ACCOUNT_APPROVED: 'account_approved',
  ACCOUNT_DISAPPROVED: 'account_disapproved',
  MESSAGE_FROM_ADMIN: 'message_from_admin',
};

export const PROMO_TYPES = {
  DISCOUNT: 'discount',
  BUY_1_GET_1: 'buy1_get1',
  GIFT_PRODUCT: 'gift_product',
};

export const APPLY_ON_OPTIONS = {
  SUBTOTAL: 'subtotal',
  TOTAL: 'total',
  WASPHA_FEES_AMOUNT: 'waspha_fee_amount',
  DELIVERY_FEE: 'delivery_fee',
};

export const ZONE_OPTIONS = {
  FIXED_ZONE: 'fixed_zone',
  FREE_ZONE: 'free_zone',
  ALL: 'all',
};

export const RIDER_TYPE = {
  ONLINE: 'online',
  WASPHA_EXPRESS: 'waspha_express',
};

export const PLACED_ORDER_TYPE = {
  NORMAL: 'normal',
  TRADITIONAL: 'traditional',
};

export const LOGIN_PLACEHOLDER = 'hani@yopmail.com / 0123456789';

export const RESEND_CODE_TIMER = 60;
