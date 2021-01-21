import { LOCATION_SUCCESS, POINT_INFO_SUCCESS } from '../actions';

const initialState = {
  locationInfo: '',
  locationInfoError: '',
  latitude: '',
  longitude: '',
  pointInfo: '',
  forecastInfo: '',
  axiosError: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_SUCCESS:
      console.log('in locSus: ', action.payload.coords.latitude)
      return ({
        ...state,
        locationInfo: action.payload,
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude,
        locationInfoError: ''
      });
    case POINT_INFO_SUCCESS:
      return ({
        ...state,
        pointInfo: action.payload,
        axiosError:''
      })
    default:
      return state;
  }
}

export default reducer;