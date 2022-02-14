import {TRACKING_AUTH} from '../config/WebService';
import {RIDER_TYPE, TRACKING_SECRETE_KEY} from '../constants/index';
import BackgroundGeolocation from 'react-native-background-geolocation';
import util from '../util';
import DataHandler from '../services/DataHandler';
import _ from 'lodash';
import {TRACKING_BASE_URL} from '../config/WebService';
import DeviceVersion from 'react-native-device-info';
let TRACKING_TOKEN = '';
let HIGH_PARAMS = {driverDetails: {}};
let LOW_PARAMS = {driverDetails: {}};
let TRACKING_PARAMS = {driverDetails: {}};
let HEART_BEAT_PARAMS = {};

const startTaskTracking = (id) => {
  console.log(
    '*****************************************************************',
  );
  console.log('Starting Task Tracking id = ', id);

  console.log(
    '*****************************************************************',
  );
  const startNewParams = _.cloneDeep(TRACKING_PARAMS);
  startNewParams.taskId = id;
  console.log({startTrackingParams: startNewParams});
  BackgroundGeolocation.setConfig({params: startNewParams}).then((state) => {
    TRACKING_PARAMS = startNewParams;
    console.log({startState: state});
  });
};
const stopTaskTracking = () => {
  console.log(
    '*****************************************************************',
  );
  console.log('stop Task Tracking');

  console.log(
    '*****************************************************************',
  );
  const stopNewParams = _.cloneDeep(TRACKING_PARAMS);
  stopNewParams.taskId = null;
  console.log({stopTaskTrackingParams: stopNewParams});
  BackgroundGeolocation.setConfig({params: stopNewParams}).then((state) => {
    TRACKING_PARAMS = stopNewParams;
    console.log({stopState: state});
  });
};
const startTracking = async () => {
  console.log('start tracking');
  let tempParams = _.cloneDeep(TRACKING_PARAMS);
  tempParams.token = util.getCurrentUserAccessToken();
  //   tempParams.secretKey = TRACKING_SECRETE_KEY;
  const user = DataHandler.getStore().getState().user.data;

  let request = {};
  let isRequestPresent = !_.isNil(
    DataHandler.getStore().getState().requests.requests[0],
  );

  if (isRequestPresent) {
    request = DataHandler.getStore().getState().requests.requests[0];
    tempParams.businessId = request.vendor.id;
    tempParams.taskId = request.request_id; // ---> req id
  }

  tempParams.hasFixedZone = !_.isNil(user.fixed_zone_id) ? true : false;
  tempParams.driverId = user.id;

  tempParams.isOnline = user.is_online;
  tempParams.driverDetails.name = user.name;

  //   tempParams.driverDetails.vehicleSize = user.wheelBase ? user.wheelBase : '';
  let deviceInfo = await BackgroundGeolocation.getDeviceInfo();
  tempParams.deviceInfo = deviceInfo;
  tempParams.appVersion = DeviceVersion.getVersion();

  TRACKING_PARAMS = tempParams;

  const BG_LOCATION_DEFAULT_PARAMS = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 10,
    stopOnTerminate: false,
    enableHeadless: true,
    startOnBoot: true,
    foregroundService: true,
    startForeground: false,
    autoSync: true,
    debug: false,
    scheduleUseAlarmManager: true,
    logLevel: BackgroundGeolocation.LOG_LEVEL_DEBUG,
    preventSuspend: true,
    heartbeatInterval: 60,
  };

  BackgroundGeolocation.onHttp(async (data) => {
    console.log({httpDataParams: TRACKING_PARAMS});
    console.log({httpData: data});
    if (!data.success) {
      //   console.log('Not success ');
      //   let newToke = await util.refreshAccessToken();
      //   console.log('setting new headers', {newToke});
      //   const headers = {};
      //   headers.authorization = `bearer ${newToke}`;
      //   console.log({headers});
      //   BackgroundGeolocation.setConfig({headers: headers});
    }
  });
  console.log({TRACKING_PARAMS});
  BackgroundGeolocation.ready(
    {
      // backgroundPermissionRationale: {
      //   title: "Allow access to this device's location in the background?",
      //   message:
      //     "In order to allow X, Y and Z, please enable 'Allow all the time permission",
      //   positiveAction: 'Change to Allow all the time',
      // },
      backgroundPermissionRationale: {
        title:
          "Allow Express to access to this device's location in the background?",
        message:
          "In order to track your activity in the background, please enable 'Allow all the time' location permission",
        positiveAction: 'Change to Allow all the time',
        negativeAction: 'Cancel',
      },
      ...BG_LOCATION_DEFAULT_PARAMS,
      locationAuthorizationRequest: 'Always',

      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      url: TRACKING_BASE_URL,
      headers: {
        authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      },
      params: TRACKING_PARAMS,
    },

    (state) => {
      console.log({state});
      if (!state.enabled) {
        BackgroundGeolocation.start((state) => {
          if (state.enabled) {
            BackgroundGeolocation.changePace(true);
          }
          console.log('- Configure success: ', state);
        });
        console.log(
          '- BackgroundGeolocation is configured and ready: ',
          state.enabled,
        );
      } else {
        // util.topAlert('Tracking already enabled', true);
      }
    },
  );
};
const resetOdoMeter = () => {
  BackgroundGeolocation.resetOdometer().then((location) => {
    // This is the location where odometer was set at.
    console.log('[setOdometer] success: ', location);
  });
};
const startHighLevelTracking = (jobId, businessId) => {
  util.getTrackingToken().then((resp) => {
    if (resp.status) {
      console.log(
        '*****************************************************************',
      );
      console.log('Starting High level');

      console.log(
        '*****************************************************************',
      );
      HIGH_PARAMS.token = resp.data[0].accessToken;
      HIGH_PARAMS.secretKey = TRACKING_SECRETE_KEY;
      const user = DataHandler.getStore().getState().user.data;
      HIGH_PARAMS.userId = user.user;
      HIGH_PARAMS.driverDetails.name = user.firstName + ' ' + user.lastName;
      HIGH_PARAMS.driverDetails.phone = user.phone;
      HIGH_PARAMS.driverDetails.vehicleSize = user.wheelBase
        ? user.wheelBase
        : '';
      HIGH_PARAMS.businessId = businessId;
      HIGH_PARAMS.jobId = jobId;
      const BG_LOCATION_DEFAULT_PARAMS = {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        foregroundService: true,
        autoSync: true,
        debug: true,
        preventSuspend: true,
        heartbeatInterval: 60,
        logLevel: BackgroundGeolocation.LOG_LEVEL_DEBUG,
      };
      // const BG_LOCATION_DEFAULT_PARAMS = {
      //   reset: true,
      //   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      //   distanceFilter: 0,
      //   locationUpdateInterval: 1000,
      //   fastestLocationUpdateInterval: 1000,
      //   allowIdenticalLocations: true,
      //   useSignificantChangesOnly: false,
      //   foregroundService: true,
      //   autoSync: true,
      //   debug: false,
      //   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      //   stopOnTerminate: false,
      //   enableHeadless: true,
      // preventSuspend: true
      // };
      BackgroundGeolocation.onHttp((data) => {
        console.log({data});
        if (!data.success) {
          util.getTrackingToken().then((resp) => {
            if (resp.status) {
              const newParams = _.cloneDeep(HIGH_PARAMS);
              newParams.token = resp.data[0].accessToken;
              BackgroundGeolocation.setConfig({params: newParams});
            }
          });
        }
      });
      BackgroundGeolocation.onHeartbeat((event) => {
        console.log('[onHeartbeat] ', event);

        // You could request a new location if you wish.
        BackgroundGeolocation.getCurrentPosition({
          samples: 1,
          persist: true,
        }).then((location) => {
          console.log('[getCurrentPosition] ', location);
          if (resp.status) {
            HEART_BEAT_PARAMS.secretKey = HIGH_PARAMS.secretKey;
            if (HEART_BEAT_PARAMS.token) {
              console.log({token: HEART_BEAT_PARAMS.token});
            } else {
              HEART_BEAT_PARAMS.token = HIGH_PARAMS.token;
            }
            HEART_BEAT_PARAMS.userId = HIGH_PARAMS.userId;
            HEART_BEAT_PARAMS.businessId = HIGH_PARAMS.businessId;
            HEART_BEAT_PARAMS.jobId = HIGH_PARAMS.jobId;
            HEART_BEAT_PARAMS.is_beat = true;

            let tempLocation = {};
            let coords = {};
            coords.latitude = location.coords.latitude;
            coords.longitude = location.coords.longitude;
            tempLocation.coords = coords;
            tempLocation.odometer = location.odometer;
            tempLocation.timestamp = location.timestamp;
            HEART_BEAT_PARAMS.location = tempLocation;

            let driverDetails = {};

            driverDetails.name = HIGH_PARAMS.driverDetails.name;
            driverDetails.phone = HIGH_PARAMS.driverDetails.phone;
            driverDetails.vehicleSize = HIGH_PARAMS.driverDetails.vehicleSize;
            HEART_BEAT_PARAMS.driverDetails = driverDetails;
            // util.sendTrackingToServer(HEART_BEAT_PARAMS).then(resp => {
            //   console.log({HeartBeatParamsHigh: HEART_BEAT_PARAMS});
            //   console.log(JSON.stringify(HEART_BEAT_PARAMS));
            //   console.log('************************************************');
            //   console.log({HeartBeatRespHigh: resp});
            //   if (resp.status !== 200) {
            //     util.getTrackingToken().then(response => {
            //       if (response.status) {
            //         HEART_BEAT_PARAMS.token = response.data[0].accessToken;
            //       }
            //     });
            //   }
            // });
          }
        });
      });
      BackgroundGeolocation.ready(
        {
          ...BG_LOCATION_DEFAULT_PARAMS,
          debug: true,
          logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
          stopOnTerminate: false,
          startOnBoot: true,
          url: TRACKING_BASE_URL,
          headers: {
            authorization: `bearer ${TRACKING_AUTH}`,
          },
          params: HIGH_PARAMS,
        },

        (state) => {
          console.log({state});
          if (!state.enabled) {
            BackgroundGeolocation.start((state) => {
              if (state.enabled) {
                BackgroundGeolocation.changePace(true);
              }
              console.log('- Configure success: ', state);
            });
            console.log(
              '- BackgroundGeolocation is configured and ready: ',
              state.enabled,
            );
          }
        },
      );
    } else {
      // util.topAlert('Unable to get Tracking token', true);
    }
  });
};
const starLowLevelTracking = () => {
  util.getTrackingToken().then((resp) => {
    if (resp.status) {
      console.log(
        '*****************************************************************',
      );
      console.log('Starting LOW level');

      console.log(
        '*****************************************************************',
      );
      let HEART_BEAT_PARAMS = {};
      let tempParams = _.cloneDeep(LOW_PARAMS);
      tempParams.token = resp.data[0].accessToken;
      tempParams.secretKey = TRACKING_SECRETE_KEY;
      const user = DataHandler.getStore().getState().user.data;

      tempParams.userId = user.user;
      tempParams.driverDetails.name = user.firstName + ' ' + user.lastName;
      tempParams.driverDetails.phone = user.phone;
      tempParams.driverDetails.vehicleSize = user.wheelBase
        ? user.wheelBase
        : '';
      LOW_PARAMS = tempParams;
      const BG_LOCATION_DEFAULT_PARAMS = {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 100,
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        foregroundService: true,
        autoSync: true,
        debug: true,
        scheduleUseAlarmManager: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_DEBUG,
        preventSuspend: true,
        heartbeatInterval: 60,
      };
      // const BG_LOCATION_DEFAULT_PARAMS = {
      //   reset: true,
      //   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      //   distanceFilter: 0,
      //   locationUpdateInterval: 5000,
      //   fastestLocationUpdateInterval: 5000,
      //   allowIdenticalLocations: true,
      //   useSignificantChangesOnly: false,
      //   foregroundService: true,
      //   autoSync: true,
      //   debug: false,
      //   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      //   stopOnTerminate: false,
      //   enableHeadless: true,
      // preventSuspend: true;
      // };
      BackgroundGeolocation.onHttp((data) => {
        console.log({httpDataParams: tempParams});
        console.log({httpData: data});
        if (!data.success) {
          console.log('Not success ');
          util.getTrackingToken().then((resp) => {
            if (resp.status) {
              console.log('setting new parems');
              const newParams = _.cloneDeep(LOW_PARAMS);
              newParams.token = resp.data[0].accessToken;
              console.log({newParams});

              BackgroundGeolocation.setConfig({params: newParams});
            }
          });
        }
      });
      BackgroundGeolocation.onHeartbeat((event) => {
        console.log('[onHeartbeat] ', event);
        // You could request a new location if you wish.
        BackgroundGeolocation.getCurrentPosition({
          samples: 1,
          persist: true,
        }).then((location) => {
          console.log('[getCurrentPosition] ', location);

          if (resp.status) {
            HEART_BEAT_PARAMS.secretKey = LOW_PARAMS.secretKey;
            if (HEART_BEAT_PARAMS.token) {
              console.log({token: HEART_BEAT_PARAMS.token});
            } else {
              HEART_BEAT_PARAMS.token = LOW_PARAMS.token;
            }
            HEART_BEAT_PARAMS.userId = LOW_PARAMS.userId;
            if (HEART_BEAT_PARAMS.businessId != null) {
              console.log({businessId: HEART_BEAT_PARAMS.businessId});
            } else {
              HEART_BEAT_PARAMS.businessId = null;
            }
            if (HEART_BEAT_PARAMS.jobId != null) {
              console.log({jobId: HEART_BEAT_PARAMS.jobId});
            } else {
              HEART_BEAT_PARAMS.jobId = null;
            }
            HEART_BEAT_PARAMS.is_beat = true;
            let tempLocation = {};
            let coords = {};
            coords.latitude = location.coords.latitude;
            coords.longitude = location.coords.longitude;
            tempLocation.coords = coords;
            tempLocation.odometer = location.odometer;
            tempLocation.timestamp = location.timestamp;
            HEART_BEAT_PARAMS.location = tempLocation;

            let driverDetails = {};

            driverDetails.name = LOW_PARAMS.driverDetails.name;
            driverDetails.phone = LOW_PARAMS.driverDetails.phone;
            driverDetails.vehicleSize = LOW_PARAMS.driverDetails.vehicleSize;
            HEART_BEAT_PARAMS.driverDetails = driverDetails;
            util.sendTrackingToServer(HEART_BEAT_PARAMS).then((resp) => {
              console.log({HeartBeatParamsLow: HEART_BEAT_PARAMS});
              console.log(JSON.stringify(HEART_BEAT_PARAMS));
              console.log('************************************************');
              console.log({HeartBeatRespLow: resp});
              if (resp.status !== 200) {
                util.getTrackingToken().then((response) => {
                  if (response.status) {
                    HEART_BEAT_PARAMS.token = response.data[0].accessToken;
                  }
                });
              }
            });
          }
        });
      });
      BackgroundGeolocation.ready(
        {
          ...BG_LOCATION_DEFAULT_PARAMS,
          url: TRACKING_BASE_URL,
          // headers: {
          //         authorization: `bearer ${TRACKING_AUTH}`,
          //       },
          params: LOW_PARAMS,
          schedule: ['1-7 00:15-23:45'],
        },
        (state) => {
          console.info('- Scheduler starting');
          BackgroundGeolocation.startSchedule();
          BackgroundGeolocation.onSchedule((state) => {
            let enabled = state.enabled;
            if (enabled) {
              BackgroundGeolocation.changePace(true);
            }
            console.log('[onSchedule] - enabled? ', enabled);
          });
          // state => {
          //   if (state.enabled) {
          //     console.log('change pace');
          //     BackgroundGeolocation.changePace(true);
          //   }
          //   console.info('- Scheduler started', state);
          // }
        },
      );
    } else {
      // util.topAlert('Unable to get Tracking token', true);
    }
  });
};
const stopTracking = async () => {
  console.log(
    '*****************************************************************',
  );
  console.log('Stop tracking from');

  console.log(
    '*****************************************************************',
  );
  await BackgroundGeolocation.reset();
  await BackgroundGeolocation.stopSchedule();
  await BackgroundGeolocation.stop();
};
export {
  startTracking,
  stopTracking,
  startHighLevelTracking,
  resetOdoMeter,
  starLowLevelTracking,
  startTaskTracking,
  stopTaskTracking,
};

// tempParams = {
//   location: {
//     event: 'motionchange',
//     is_moving: true,
//     uuid: '409405a8-48d8-4432-ad6d-461b7dc2821e',
//     timestamp: '2020-11-09T15:49:38.606Z',
//     odometer: 6439049.5,
//     mock: true,
//     coords: {
//       latitude: 53.7614,
//       longitude: -1.74514,
//       accuracy: 0,
//       speed: 13.89,
//       heading: 0,
//       altitude: 0,
//     },
//     activity: {
//       type: 'still',
//       confidence: 100,
//     },
//     battery: {
//       is_charging: false,
//       level: 0.36,
//     },
//     extras: {},
//   },
//   driverId: 23,
//   businessId: 2999,
//   driverDetails: {
//     name: 'Abbas',
//     phone: '923152147269',
//     vehicleSize: '',
//   },
//   taskId: null,
// };
