import weather from '../../api';
import {
  FETCH_CURRENT,
  FETCH_CURRENT_FAIL,
  FETCH_CURRENT_SUCCESS,
} from '../types';

const fetchCurrent = () => async dispatch => {
  try {
    dispatch({type: FETCH_CURRENT});
    const response = await weather.get('weather', {
      params: {
        q: 'Noida',
      },
    });

    dispatch({type: FETCH_CURRENT_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: FETCH_CURRENT_FAIL, payload: error});
    throw error;
  }
};

export {fetchCurrent};
