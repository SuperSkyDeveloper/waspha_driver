// @flow

import * as storage from 'redux-storage';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import filter from 'redux-storage-decorator-filter';
import {composeWithDevTools} from 'remote-redux-devtools';
import {createStore, applyMiddleware} from 'redux';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
// import reducers from "../reducers";
import sagas from '../sagas';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default function configureStore(reducers, onComplete: Function) {
  const engine = filter(
    createEngine('AppTree'),
    [
      'whitelisted-key',
      ['user', 'data'],
      ['user', 'isInRegion'],
      ['general', 'appLanguage'],
      ['requests', 'requests'],
      ['services', 'serviceTypes'],
      ['services', 'serviceProviders'],
      ['user', 'profileSections'],
      ['user', 'credentials'],
      ['user', 'riderOnlineStatus'],
      ['general', 'initialRun'],
      ['general', 'countryCode'],
      ['general', 'appSetting'],
      /* ["events", "monthWiseData"] */
    ],
    [],
  );
  const storeMiddleware = storage.createMiddleware(engine);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    storage.reducer(reducers),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, storeMiddleware, logger),
    ),
  );

  if (isDebuggingInChrome) {
    window.store = store;
  }

  const load = storage.createLoader(engine);
  load(store)
    .then(onComplete)
    .catch(() =>
      console.log('Failed to load previous state @ configureStore.js#44'),
    );

  sagaMiddleware.run(sagas);

  return store;
}
