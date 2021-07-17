import {combineReducers} from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
  auth: authReducer,
  theme: themeReducer,
  weather: weatherReducer,
});
