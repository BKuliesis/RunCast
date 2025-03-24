import { useState, useEffect } from 'react';
import { roundWeatherData } from './utils/Round';
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
    localStorage.setItem("tempUnits", "celsius");
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

    let weather = await getWeather(search, tempUnits);
    if (!weather) return;
  
    // Convert wind speed units
    const rawSpeed = weather.wind.speed;
    const apiSpeedUnit = tempUnits === "celsius" ? "m/s" : "mph";
  
    let convertedSpeed;
  
    if (apiSpeedUnit === "m/s" && speedUnits === "mph") {
      convertedSpeed = rawSpeed * 2.23694;
    } else if (apiSpeedUnit === "mph" && speedUnits === "m/s") {
      convertedSpeed = rawSpeed / 2.23694;
    } else {
      convertedSpeed = rawSpeed;
    }
  
    weather.wind.speed = convertedSpeed;
    weather.wind.unit = speedUnits;
  
    // Round all numbers to the nearest 0.5
    weather = roundWeatherData(weather);
  
    setWeather(weather);

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
        <Body weather={weather} />
        <Footer />
      </div>
    )
  );
}

export default App;
