import {
  FETCH_CURRENT,
  FETCH_CURRENT_FAIL,
  FETCH_CURRENT_SUCCESS,
} from '../types';

const initial_state = {
  loading: false,
  weather: null,
  error: '',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_CURRENT:
      return {...state, loading: true};
    case FETCH_CURRENT_FAIL:
      return {...state, weather: null, error: action.payload};
    case FETCH_CURRENT_SUCCESS:
      return {...state, weather: action.payload, loading: false, error: ''};
    default:
      return state;
  }
};
