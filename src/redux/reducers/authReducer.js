import {LOADING} from '../types';

const initial_state = {
  loading: false,
  success: '',
  error: '',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};
    default:
      return state;
  }
};
