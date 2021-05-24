// @ts-nocheck
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import array from './array';
import promise from './promise';
import whitelist from './whitelist';
import idx from 'idx';
import {goToAuth, goHome, goToRegister} from '../config/navigation';
import {Navigation} from 'react-native-navigation';
import socket from 'utils/Socket';

export const storeObj = {};
const persistConfig = {
  timeout: 0,
  whitelist,
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares, ...[thunk, promise, array]),
);

export const persistor = persistStore(store, {}, () => {
  let userLoggedIn = idx(
    store,
    (_) => _.getState().authReducer.loginData.data.token,
  );
  let userId = idx(store, (_) => _.getState().authReducer.loginData.data._id);
  setTimeout(() => {
    //Session Managemanet check here
    if (userLoggedIn) {
      goHome();
    } else {
      goToAuth();
    }
  }, 1000);

  return store;
});
