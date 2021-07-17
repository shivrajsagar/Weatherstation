import {THEME} from '../types';

const initial_state = {
  theme: false,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case THEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};
