import React, { useState } from "react";

function App() {

  const [query, setquery] = useState('');
  const [weather, setWeather] = useState({});
  
  const getApiUrl = (city) => {
    const apiKey = "8e110047d5069b53cdbcd1e7c314ff2e";
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
  }
  
  const search = evt => {
    if (evt.key === "Enter"){
      const apiUrl = getApiUrl(query);
      fetch(apiUrl)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setquery('');
        console.log(result);
      });
    }
  }

  const datebuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className = {
      (typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16) 
      ? 'app warm'
      : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar" 
          onChange={e => setquery(e.target.value)}
          value = {query}
          onKeyDown = {search}></input>
        </div>

        {(typeof weather.main != "undefined") ? (
           <div className="location-box">
           <div className="location">
             {weather.name}, {weather.sys.country}
           </div>
           <div className="date">
             {datebuilder(new Date())}
           </div>
           <div className="weather-box">
             <div className="temp">
              {Math.round(weather.main.temp)}°C       
             </div>
             <div className="weather">
               {weather.weather[0].main}
             </div>
           </div>
         </div>
        ): (' ')}
       
      </main>
    </div>
  );
}

export default App;
