import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLocationSuccess } from './actions';

//Weather Version 1 Goals
  //Get user's gps location
  // https://forecast.weather.gov/MapClick.php?lon=-105.6234318&lat=33.3162305
  // https://forecast.weather.gov/MapClick.php?lat=33.3162305&lon=-105.6234318&FcstType=graphical
  // https://api.weather.gov/points/33.3162305,-105.6234318
  // https://api.weather.gov/gridpoints/ABQ/128,37/forecast


function App(props) {
  // const [userLocation, setUserLocation] = useState(null)
  // const [userLocationError, setUserLocationError] = useState(null)
  const [displayNumber, setDisplayNumber] = useState(1);
  useEffect(() => {
    getUserLocation()
  },[]) //eslint-disable-line
  
  // useEffect(() => {
  //   console.log('dependant useEffect ', userLocation)
  //   if (!userLocation) {
  //     return console.log('not yet')
  //   }
  //   axios
  //     .get('https://api.weather.gov/points/33.3162305,-105.6234318')
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // },[userLocation]);
  useEffect(() => {

  },[])


  // navigator.geolocation.getCurrentPosition(res => {setUserLocation(res)}, err => {setUserLocationError(err)})

  function getUserLocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(res => {props.getLocationSuccess(res)}, err => {console.log('ERROR GETTING LOCATION!!! ', err)})
    } else {
      return alert('Sorry, auto geolocation not supported, please type in coordinates')
    }
  }
  // getUserLocation()
  // console.log('locationSuccess ', userLocation);
  // console.log('locationError ', userLocationError);

  // if (!userLocation){
  //   return (
  //     <h1>Please Wait...</h1>
  //   )
  // }
  console.log('long', props.longitude)
  console.log('lat', props.latitude)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Version 1</h1>
      </header>
        <p>
          {props.longitude ? `Longitude: ${props.longitude}` : 'no'}
        </p>
        <p>
          {props.latitude ? `Latitude: ${props.latitude}` : 'no'}
        </p>
        <button onClick={() => setDisplayNumber(1)} disabled={displayNumber === 1}>Display 1 Day</button>
        <button onClick={() => setDisplayNumber(2)} disabled={displayNumber === 2}>Display 2 Days</button>
        <button onClick={() => setDisplayNumber(3)} disabled={displayNumber === 3}>Display 3 Days</button>
        <div className='imageGroup'>
        {
          props.forecastZone && (displayNumber > 0) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=0&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='48 Hour Forecast' />
        }
        {
          props.forecastZone && (displayNumber > 1) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=48&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='48 Hour Forecast' />
        }
        {
          props.forecastZone && (displayNumber > 2) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=96&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='48 Hour Forecast' />
        }
        </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    locationInfo: state.locationInfo,
    pointInfo: state.pointInfo,
    latitude: state.latitude,
    longitude: state.longitude,
    forecastInfo: state.forecastInfo,
    forecastZone: state.forecastZone
  }
}

export default connect(mapStateToProps, { getLocationSuccess })(App);
