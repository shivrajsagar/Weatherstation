import weather from '../../api';
import {
  FETCH_CURRENT,
  FETCH_CURRENT_FAIL,
  FETCH_CURRENT_SUCCESS,
  SEARCH_ERROR,
  SEARCH_LOADING,
  SEARCH_WEATHER,
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

const searchWeather = query => async dispatch => {
  try {
    dispatch({type: SEARCH_LOADING});
    await weather
      .get('weather', {
        params: {
          q: query,
        },
      })
      .then(data => {
        dispatch({type: SEARCH_WEATHER, payload: data.data});
      })
      .catch(err => {
        dispatch({type: SEARCH_ERROR, payload: 'Something went wrong'});
        console.log(err, 'error');
      });
  } catch (error) {
    throw error;
  }
};

export {fetchCurrent, searchWeather};
