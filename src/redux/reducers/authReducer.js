import {
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_CONFIRM,
  SET_USER,
  USER_VALUE,
  SET_INITIALIZING,
  SET_CODE,
} from '../types';

const initial_state = {
  isAuthenticated: false,
  token: '',
  email: '',
  password: '',
  mobile: '',
  otp: '',
  loading: false,
  success: '',
  error: '',

  //mfa
  initializing: true,
  user: null,
  confirm: null,
  code: '',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};
    case USER_VALUE:
      return {
        ...state,
        loading: false,
        [action.payload.prop]: action.payload.value,
        success: '',
        error: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
        isAuthenticated: true,
        email: '',
        password: '',
        error: '',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        email: '',
        password: '',
        success: '',
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
        email: '',
        password: '',
        error: '',
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        email: '',
        password: '',
        success: '',
      };

    //mfa
    case SET_USER:
      return {...state, user: action.payload};
    case SET_INITIALIZING:
      return {...state, initializing: action.payload};
    case SET_CONFIRM:
      return {...state, confirm: action.payload};
    case SET_CODE:
      return {...state, code: action.payload};
    default:
      return state;
  }
};
