// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  APP_SETTINGS,
  CHANGE_LANGUAGE,
  FAQS,
  FIRST_TIME_OPEN,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_GDPR_COMPLIANCE_STATEMENT,
  GET_PRIVACY_POLICY,
  GET_TERMS_AND_CONDITION,
  GET_RATINGS,
  GET_NOTIFICATIONS_LIST,
  GET_TRANSLATIONS,
  ALERT_MESSAGE,
  GET_FIXED_ZONE_REGIONS,
  SET_COUNTRY_CODE,
} from '../actions/ActionTypes';
import {GetCurrentTimeInISO} from '../helpers/generalHelper';

const initialState = Immutable({
  initialRun: true,
  appSetting: {},
  faqs: [],
  appLanguage: 'en',
  cookiePolicy: '',
  copyRight: '',
  termsAndCondition: '',
  privacyPolicy: '',
  GDPRComplianceStatement: '',
  ratings: [],
  notifications: [],
  alertMessage: '',
  translationLocales: {
    translationsUpdatedAt: null,
  },
  fixedZoneRegions: [],
  countryCode: 'AE',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_SETTINGS.SUCCESS: {
      return Immutable.merge(state, {
        appSetting: action.data,
      });
    }
    case FAQS.SUCCESS: {
      return Immutable.merge(state, {
        faqs: action.data,
      });
    }

    case CHANGE_LANGUAGE.SUCCESS: {
      return Immutable.merge(state, {
        appLanguage: action.data,
      });
    }
    case FIRST_TIME_OPEN: {
      return Immutable.merge(state, {
        initialRun: false,
      });
    }

    case GET_COOKIE_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        cookiePolicy: action.data,
      });
    }

    case GET_COPY_RIGHT_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        copyRight: action.data,
      });
    }

    case GET_TERMS_AND_CONDITION.SUCCESS: {
      return Immutable.merge(state, {
        termsAndCondition: action.data,
      });
    }

    case GET_PRIVACY_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        privacyPolicy: action.data,
      });
    }

    case GET_GDPR_COMPLIANCE_STATEMENT.SUCCESS: {
      return Immutable.merge(state, {
        GDPRComplianceStatement: action.data,
      });
    }

    case GET_NOTIFICATIONS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        notifications: action.data,
      });
    }

    case GET_RATINGS.SUCCESS: {
      return Immutable.merge(state, {
        ratings: action.data,
      });
    }

    case GET_TRANSLATIONS.SUCCESS: {
      const temp = {
        translationsUpdatedAt: GetCurrentTimeInISO(),

        ...action.data,
      };
      return Immutable.merge(state, {
        translationLocales: temp,
      });
    }

    case GET_FIXED_ZONE_REGIONS.SUCCESS: {
      return Immutable.merge(state, {
        fixedZoneRegions: action.data,
      });
    }

    case ALERT_MESSAGE: {
      return Immutable.merge(state, {
        alertMessage: action.data,
      });
    }

    case SET_COUNTRY_CODE: {
      return Immutable.merge(state, {
        countryCode: action.data,
      });
    }

    default:
      return state;
  }
};
