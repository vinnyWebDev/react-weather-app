import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/search/current-weather/current-weather";
import { WEATHER_API_URL } from "./api";
import { WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    //we extract the latitude and longitude sata from our result
    const [lat, lon] = searchData.value.split(" ");

    //fetches for weather
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    //fetches for forecast
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}}&units=metric`
    );

    //executes both our fetches
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        //set cxrrent weather and forcast to result of search
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.labek, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    //class container here to add some global styles
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {/* Below says that if currentWeather variable exists, render CurrentWeather component */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
