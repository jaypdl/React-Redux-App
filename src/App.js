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
  const [displayNumber, setDisplayNumber] = useState(2);
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
  // console.log('long', props.longitude)
  // console.log('lat', props.latitude)
  console.log(props.locationInfo.coords)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Version αlpha</h1>
      </header>
        <p>
          {props.longitude ? `Longitude: ${props.longitude}` : 'Loading...'}

          <br />
          
          {props.latitude ? `Latitude: ${props.latitude}` : 'Please Wait...'}

          {props.locationInfo.coords && props.locationInfo.coords.altitude && <br />}

          {props.locationInfo.coords && props.locationInfo.coords.altitude && `Elevation: ${(props.locationInfo.coords.altitude * 3.2808399).toFixed(2)} ft` }
          
          <br />

          {props.pointInfo && `${props.pointInfo.properties.relativeLocation.properties.city}, ${props.pointInfo.properties.relativeLocation.properties.state}`}
        </p>
        <button onClick={() => setDisplayNumber(2)} disabled={displayNumber === 2}>Display 2 Days</button>
        <button onClick={() => setDisplayNumber(4)} disabled={displayNumber === 4}>Display 4 Days</button>
        <button onClick={() => setDisplayNumber(6)} disabled={displayNumber === 6}>Display 6 Days</button>
        <button onClick={() => setDisplayNumber(8)} disabled={displayNumber === 8}>Display 8 Days (Max)</button>
        <div className='imageGroup'>
        {
          props.forecastZone && (displayNumber > 0) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=0&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='0 to 2 Day Forecast' />
        }
        {
          props.forecastZone && (displayNumber > 2) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=48&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='2 to 4 Day Forecast' />
        }
        {
          props.forecastZone && (displayNumber > 4) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=96&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='4 to 6 Day Forecast' />
        }
        {
          props.forecastZone && (displayNumber > 6) &&
          <img className={'forecastImage'} src={`https://forecast.weather.gov/meteograms/Plotter.php?lat=${props.latitude}&lon=${props.longitude}&wfo=${props.pointInfo.properties.cwa}&zcode=${props.forecastZone}&gset=30&gdiff=8&unit=0&tinfo=MY7&ahour=144&pcmd=11011111111110100000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`} alt='6 to 8 Day Forecast' />
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
