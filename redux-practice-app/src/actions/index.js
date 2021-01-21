import axios from 'axios';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const POINT_INFO_SUCCESS = 'POINT_INFO_SUCCESS';
export const GET_FORECAST_START = 'GET_FORECAST_START';
export const GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS';

export const getLocationSuccess = (info) => dispatch => {
  dispatch({ type: LOCATION_SUCCESS, payload: info})
  axios
    .get(`https://api.weather.gov/points/${info.coords.latitude},${info.coords.longitude}`)
    .then(res => {
      dispatch({ type: POINT_INFO_SUCCESS, payload: res.data})
    })
}

export const getForecast = (lat, long) => dispatch => {
  dispatch({})
}