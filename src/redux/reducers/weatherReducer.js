import {
  FETCH_CURRENT,
  FETCH_CURRENT_FAIL,
  FETCH_CURRENT_SUCCESS,
  SEARCH_ERROR,
  SEARCH_LOADING,
  SEARCH_WEATHER,
} from '../types';

const initial_state = {
  loading: false,
  weather: null,
  search: null,
  searchLoading: false,
  searchError: '',
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
    case SEARCH_LOADING:
      return {...state, searchLoading: true};
    case SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload,
        searchLoading: false,
        search: null,
      };
    case SEARCH_WEATHER:
      return {
        ...state,
        search: action.payload,
        searchLoading: false,
        searchError: '',
      };
    default:
      return state;
  }
};
