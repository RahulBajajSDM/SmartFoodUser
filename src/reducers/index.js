// @ts-nocheck
import {combineReducers} from 'redux';
import authReducer from './auth';
import componentStats from './componentStats';
import commonReducer from './common';
import dashboardReducer from './dashboardReducer';
import paymentReducer from './paymentReducer';
import chatReducer from './chatReducer';
import themeReducer from 'config/theme/reducers';

const applicationReducer = combineReducers({
  authReducer,
  componentStats,
  commonReducer,
  dashboardReducer,
  paymentReducer,
  chatReducer,
  themeReducer,
});

export default applicationReducer;
