import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import orders from './orders';
import trips from './trips';
import requests from './requests';
import general from './general';
import internal from './internal';
import chat from './chat';
import zone from './zone';

export default combineReducers({
  route: navigator,
  user,
  orders,
  trips,
  requests,
  general,
  internal,
  chat,
  zone,
});
