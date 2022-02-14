import moment, {duration} from 'moment';
import {
  TIME_FORMAT2,
  DATE_FORMAT2,
  DATE_TIME,
  TIME_FORMAT1,
  SPACE_LIMIT,
} from '../constants';

/**
 *
 * @param {String} DateTime ISO String to be converted
 * @param {String} format Expected Format
 */
const ISOToFormat = (DateTime, format) => {
  if (moment(DateTime).format(format) === 'Invalid date') {
    return null;
  } else {
    return moment(DateTime).format(format);
  }
};

/**
 *
 * @param {String} DateTime Formatted time
 * @param {String} format Format of given time
 */
const toISOString = (DateTime, format) => {
  return moment(DateTime, format).toISOString();
};

// setTime = (value) => {
//   let time = ISOToFormat(value, TIME_FORMAT1);
//   let date = ISOToFormat(this.state.dateTime, DATE_FORMAT2);

//   let dateTime = `${date} ${time}`;

//   toISOString(dateTime, 'YYYY:MM:DD HH:MM:AA');
// };

const setDateTime = (time, date) => {
  let finalTime = ISOToFormat(time, TIME_FORMAT1);
  let finalDate = ISOToFormat(date, DATE_FORMAT2);
  let finalDateTime = `${finalDate} ${finalTime}`;
  return toISOString(finalDateTime, DATE_TIME);
};

const TimeFromNow = (data) => {
  return moment(data).fromNow();
};

const GetCurrentTimeInISO = () => {
  return moment().toISOString();
};

const getTimeDifference = (from, to = moment()) => {
  from = moment(from);
  return from.diff(to, 'minutes');
};

const isSameDateToday = (date) => {
  return GetCurrentTimeInISO() === ISOToFormat(date, DATE_FORMAT2);
};

const distance = (cord1, cord2) => {
  if (cord1.latitude == cord2.latitude && cord1.longitude == cord2.longitude) {
    return 0;
  } else {
    var radlat1 = (Math.PI * cord1.latitude) / 180;
    var radlat2 = (Math.PI * cord2.latitude) / 180;
    var theta = cord1.longitude - cord2.longitude;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    if (dist >= SPACE_LIMIT) {
      return true;
    }
    return false;
  }
};

// return sum all trips earning
const calculateTripsEarnings = (arr = [], key = 'earning') => {
  if (arr.length === 0) {
    return 0;
  }
  // if arr length is 1 then return earning otherwise its return whole object
  if (arr.length === 1) {
    return arr[0][key];
  }

  return arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[key];
  }, 0);
};

const manipulateDirectionData = (data) => {
  let finalData = [];
  data.forEach((element) => {
    finalData.unshift({
      latitude: element.latitude || element.lat,
      longitude: element.longitude ||  element.lng,
      icon: element.icon ,
    });
  });

  return finalData;
};

export {
  manipulateDirectionData,
  calculateTripsEarnings,
  toISOString,
  ISOToFormat,
  getTimeDifference,
  GetCurrentTimeInISO,
  TimeFromNow,
  setDateTime,
  distance,
  isSameDateToday,
};
