import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';
import { updateTheme } from './utils/Theme';
import getWeather from './api/weather';

function setupLocalStorage() {
  if (!localStorage.getItem("mode")) {
    localStorage.setItem("mode", "basic");
  }
  if (!localStorage.getItem("tempUnits")) {
    localStorage.setItem("tempUnits", "c");
  }
  if (!localStorage.getItem("speedUnits")) {
    localStorage.setItem("speedUnits", "m/s");
  }
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "system");
  }
}

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // Added for forecast data
  const [loading, setLoading] = useState(true);
  const [currentSearch, setCurrentSearch] = useState("London");

  const [mode, setMode] = useState("");
  const [tempUnits, setTempUnits] = useState("");
  const [speedUnits, setSpeedUnits] = useState("");

  useEffect(() => {
    async function inititalize() {
      setupLocalStorage();
      setMode(localStorage.getItem("mode"));
      setTempUnits(localStorage.getItem("tempUnits"));
      setSpeedUnits(localStorage.getItem("speedUnits"));
      updateTheme();
      await handleSearch(currentSearch);
      setLoading(false);
    }
    inititalize();
  }
  , []);

  useEffect(() => {
    handleSearch(currentSearch);
  }, [tempUnits, speedUnits]);

  async function handleSearch(search) {  
    if (!search || search.trim() === "") return;

    let response = await getWeather(search, tempUnits);
    if (!response) return;

    let weather = response.weatherResponse;

    let forecast = response.forecastResponse;
    // Convert wind speed units
    const rawSpeed = weather.wind.speed;
    const apiSpeedUnit = tempUnits === "c" ? "m/s" : "mph";
  
    let convertedSpeed;
  
    if (apiSpeedUnit === "m/s" && speedUnits === "mph") {
      convertedSpeed = rawSpeed * 2.23694;
    } else if (apiSpeedUnit === "mph" && speedUnits === "m/s") {
      convertedSpeed = rawSpeed / 2.23694;
    } else {
      convertedSpeed = rawSpeed;
    }
  
    weather.wind.speed = Math.round(convertedSpeed * 10) / 10;
    weather.wind.unit = speedUnits;

    console.log(forecast);

    const roundedWeather = Object.fromEntries(Object.entries(weather.main).map(([key, value]) => [key, Math.round(value)]));
    weather.main = roundedWeather;

    const roundedForecastWeather = forecast.list.map(item => {
      const roundedMain = Object.fromEntries(Object.entries(item.main).map(([key, value]) => [key, Math.round(value)]));
      item.main = roundedMain;
      return item;
    }
    );
    forecast.list = roundedForecastWeather;
  
    setWeather(weather);

    setForecast(forecast);

    setCurrentSearch(search);
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    // Need to implement
  }

  function handleUnitsChange(newTempUnit, newSpeedUnit) {
    setTempUnits(newTempUnit);
    setSpeedUnits(newSpeedUnit);
    localStorage.setItem("tempUnits", newTempUnit);
    localStorage.setItem("speedUnits", newSpeedUnit);
  }

  return (
    loading ? null : (
      <div className="App">
        <Navbar 
          handleSearch={handleSearch} 
          mode={mode}
          tempUnits={tempUnits}
          speedUnits={speedUnits}
          handleModeChange={handleModeChange}
          handleUnitsChange={handleUnitsChange}
        />
        <Body weather={weather} forecast={forecast} />
        <Footer />
      </div>
    )
  );
}

export default App;
