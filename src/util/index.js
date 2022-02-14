// @flow
import {Platform, Share, Linking} from 'react-native';
import moment from 'moment';
import 'moment/locale/ar';
import _ from 'lodash';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import GetLocation from 'react-native-get-location';
import {MESSAGE_TYPES, DISCARD_WARNING, strings} from '../constants';
import Snackbar from 'react-native-snackbar';
import DataHandler from '../services/DataHandler';
import Geolocation from '@react-native-community/geolocation';
import {Images} from '../theme';
import {userSignOutSuccess, refreshToken} from '../actions/UserActions';
import {BASE_URL} from '../config/WebService';
import {Actions} from 'react-native-router-flux';
class Util {
  keyExtractor = (item: Object, index: number) => index.toString();

  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  isStrongPassword(password) {
    return (
      (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) ||
      password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
    );
  }

  async checkIsLocation() {
    if (this.isPlatformAndroid()) {
      let check =
        await LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message:
            "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: 'YES',
          cancel: 'NO',
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: true, //true => To prevent the location services window from closing when it is clicked outside
          preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
          providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        }).catch((error) => error);

      return Object.is(check.status, 'enabled');
    } else {
      Geolocation.requestAuthorization();
      return true;
    }
  }

  async getCoordinates() {
    return new Promise(async function (resolve, reject) {
      await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 35000,
      })
        .then((geo_success) => {
          console.warn('GEO_SUCCESS', JSON.stringify(geo_success));
          const {latitude, longitude} = geo_success;
          const location = {};
          location['coordinates'] = {
            latitude,
            longitude,
          };
          resolve(location);
        })
        .catch((error) => {
          console.warn('GEO_ERROR', error);
          resolve(error);
        });
    });
  }

  topAlert(message, action) {
    if (action) {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'ok',
          textColor: 'white',
          onPress: () => null,
        },
        rtl: this.isRTL(),
      });
    } else {
      Snackbar.show({
        rtl: this.isRTL(),
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  // todo ask zain bhai
  // topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
  //   showMessage({
  //     message,
  //     type: alertType,
  //     autoHide: false,
  //     backgroundColor: Colors.red,
  //     color: Colors.white,
  //   });
  // }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  isRequiredErrorMessage(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)} ${strings.IS} ${
      strings.REQUIRED
    }`;
  }

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  async refreshAccessToken() {
    console.log('here in refreshAccessToken');
    let options = Object.assign({method: 'POST'});
    let data = {};
    data.refresh_token = this.getCurrentUserRefreshToken();
    console.log({refreshData: data});

    options.body = JSON.stringify(data);

    console.log({options});
    try {
      const response = await fetch(`${BASE_URL}resume-access-token`, options);

      // console.log({newAccessToken: response});
      const responseJson = await response.json();
      // console.log({newAccessToken: responseJson.data});
      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      console.log({refreshTokenError: error});

      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  switchLanguage(languageCode) {
    strings.setLanguage(languageCode);
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  isLastItem(array, index) {
    return index + 1 === array.length;
  }

  isLoading = (obj) => {
    return this.setState(obj);
  };

  isEmptyReturnValue = (value) => {
    if (!_.isEmpty(value)) {
      return value;
    }
    return false;
  };
  isEmptyNumber = (value) => {
    if (value) {
      return value;
    }
    return false;
  };

  vendorImagePlaceholder(val) {
    if (!_.isNil(val)) {
      return {uri: val};
    }
    return Images.ProfilePlaceholder;
  }
  customerImagePlaceholder(val) {
    if (!_.isNil(val)) {
      return {uri: val};
    }
    return Images.ProfilePlaceholder;
  }
  riderImagePlaceholder(val) {
    if (!_.isNil(val)) {
      return {uri: val};
    }
    return Images.ProfilePlaceholder;
  }

  isOnlineRider() {
    return DataHandler.getStore().getState().user.type === 'online';
  }
  isWasphaRider() {
    return DataHandler.getStore().getState().user.type === 'waspha_box';
  }

  ISOToFormat(DateTime, format) {
    if (!_.isNil(DateTime)) {
      if (moment(DateTime).format(format) === 'Invalid date') {
        return null;
      } else {
        return moment(DateTime).format(format);
      }
    }
  }

  /**
   *
   * @param {String} DateTime Formatted time
   * @param {String} format Format of given time
   */
  toISOString(DateTime, format) {
    return moment(DateTime, format).toISOString();
  }

  capitalizeSentence(val) {
    if (val) {
      return val.toUpperCase();
    }
    return val;
  }

  isVerified(val) {
    if (val) {
      return strings.VERIFIED;
    }
    return strings.NOT_VERIFIED;
  }

  findVehicle(vehicles, driverVehicleId) {
    return [_.find(vehicles, {id: driverVehicleId})];
  }

  decimalPlaces(value, numDigits = 2) {
    if (value) {
      return value.toFixed(numDigits);
    } else {
      return 0;
    }
  }

  findDriverVehicle = (vehicles, driverVehicleId) => {
    let data = _.find(vehicles, function (item) {
      return item.id === driverVehicleId;
    });
    console.log({data});
    return data.image.color;
  };

  generateGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  ////////////////////////
  // CHANGE LANGUAGE

  switchLanguage(languageCode) {
    strings.setLanguage(languageCode);
  }

  isRTL() {
    let selectedLanguage = strings.getLanguage();

    const rtl = ['ar'];

    return selectedLanguage.includes(rtl);
  }

  rtlRightText() {
    return this.isRTL() ? 'right' : 'left';
  }
  rtlLeftText() {
    return this.isRTL() ? 'left' : 'right';
  }

  updateLocale = (appLanguage) => {
    moment.updateLocale(appLanguage, {
      relativeTime: {
        // future: 'dans %s',
        s: 'a few sec',
        m: 'a min',
        mm: '%d mins',
        // h: 'une heure',
        // hh: '%d heures',
        // d: 'un jour',
        // dd: '%d jours',
        // M: 'un mois',
        // MM: '%d mois',
        // y: 'un an',
        // yy: '%d ans',
      },
    });
  };

  EARNING_FILTER = () => {
    return [
      {label: 'weekly', title: strings.WEEKLY},
      {label: 'monthly', title: strings.MONTHLY},
      {label: 'yearly', title: strings.YEARLY},
    ];
  };

  profilePlaceHolderImage(image) {
    if (image) {
      return _.isEmpty(image) ? Images.ProfilePlaceholder : {uri: image};
    }
  }

  isValueEmpty(data, placeholder = '') {
    if (data) {
      return data;
    }
    return placeholder;
  }
  shareApp = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });
      Actions.reset('drawerMenu');
    } catch (error) {
      alert(error.message);
    }
  };
  rateApp = (Link) => {
    if (Platform.OS != 'ios') {
      //To open the Google Play Store
      Linking.openURL(Link).catch((err) =>
        alert('Please check for the Google Play Store'),
      );
    } else {
      //To open the Apple App Store
      Linking.openURL(Link).catch((err) =>
        alert('Please check for the App Store'),
      );
    }
  };
}

export default new Util();
