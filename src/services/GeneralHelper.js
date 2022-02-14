import {StatusBar, Platform} from 'react-native';
// import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder';
import * as RNLocalize from 'react-native-localize';
import {GOOGLE_COUNTRY_APIKEY} from '../constants';
export const customStatusBar = () => {
  StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }
};

// export const getCurrentRegion = async () => {
//   let place = RNLocalize.getTimeZone().split('/')[1];
//   let rofl;
//   // Geocoder.init(GOOGLE_COUNTRY_APIKEY);
//   // await Geocoder.from(place)
//   //   .then((json) => {
//   //     rofl = json.results[0].geometry.location;
//   //   })
//   //   .catch((error) => console.warn('ERRIOR', error));
//   // return rofl;

//   Geocoder.fallbackToGoogle(GOOGLE_COUNTRY_APIKEY);

//   await Geocoder.geocodeAddress(place)
//     .then((json) => {
//       rofl = json[0].position;
//     })
//     .catch((error) => console.warn('ERRIOR', error));

//   console.warn({rofl});
//   return rofl;
// };

export const getCurrentRegion = async (fromCountryCode = false) => {
  let place = RNLocalize.getTimeZone().split('/')[1];
  let rofl;
  console.log({place});
  Geocoder.fallbackToGoogle(GOOGLE_COUNTRY_APIKEY);
  await Geocoder.geocodeAddress(place)
    .then((json) => {
      if (fromCountryCode) {
        rofl = json[0].countryCode;
        console.log('1');
      } else {
        rofl = json[0].position;
        console.log('2');
      }
      console.log({json});
    })
    .catch((error) => console.warn('ERRIOR', error));
  console.log('ROFL', rofl);
  return rofl;
};
