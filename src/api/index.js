import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    appid: '7f926d45303a3f26202f031aa641920b',
  },
});
