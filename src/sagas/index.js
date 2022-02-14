import {fork} from 'redux-saga/effects';
import user from './user';
import general from './general';
import init from './init';
import trips from './trips';
import orders from './orders';
import requests from './requests';
import tripsAndOrders from './tripsAndOrders';
import chat from './chat';
import zone from './zone';

export default function* root() {
  yield fork(user);
  yield fork(init);
  yield fork(trips);
  yield fork(orders);
  yield fork(requests);
  yield fork(tripsAndOrders);
  yield fork(general);
  yield fork(chat);
  yield fork(zone);
}
