import React, { useState, useEffect} from 'react';
import './App.css';

//Weather Version 1 Goals
  //Get user's gps location
  //https://forecast.weather.gov/MapClick.php?lat=38.8894&lon=-77.0352&FcstType=graphical


function App() {

  useEffect(() => {
    getUserLocation()
  },[])
  const [userLocation, setUserLocation] = useState(null)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(res => {setUserLocation(res)}, err => {setUserLocation(err)})
    }
  }

  if (!userLocation){
    return (
      <h1>Please Wait</h1>
    )
  }
  console.log(userLocation);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Version 1</h1>
        <p>
          {/* {userLocation ? `Latitude: ${userLocation.coords.latitude}` : 'Waiting'} */}
          {userLocation.coords ? `Info: ${userLocation.coords.latitude}`: 'no'}
        </p>
      </header>
    </div>
  );
}

export default App;
