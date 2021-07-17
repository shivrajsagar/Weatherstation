import {THEME} from '../types';

const changeTheme = theme => async dispatch => {
  try {
    dispatch({type: THEME, payload: theme});
  } catch (error) {
    throw error;
  }
};

export {changeTheme};
