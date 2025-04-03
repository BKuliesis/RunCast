import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import { updateTheme } from './utils/Theme';
import getWeather from './api/weather';
import getSearchSuggestions from './api/suggestions'; //

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSearch, setCurrentSearch] = useState("London");
  const [suggestions, setSuggestions] = useState([]);

  const [mode, setMode] = useState(localStorage.getItem("mode") || "basic");
  const [tempUnits, setTempUnits] = useState(localStorage.getItem("tempUnits") || "c");
  const [speedUnits, setSpeedUnits] = useState(localStorage.getItem("speedUnits") || "m/s");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  useEffect(() => {
    async function inititalize() {
      localStorage.setItem("mode", mode);
      localStorage.setItem("tempUnits", tempUnits);
      localStorage.setItem("speedUnits", speedUnits);
      localStorage.setItem("theme", theme);

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

  async function handleSearch(search) {  
    if (!search || search.trim() === "") return;

    let response = await getWeather(search, tempUnits);
    if (!response) return;

    setWeather({
      weather: response.weatherResponse,
      forecast: response.forecastResponse,
      recentRain: response.recentRain,
      extra: response.extra.current,
      airQuality: response.airQuality,
    });
    setCurrentSearch(search);
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  }

  function handleUnitsChange(newTempUnit, newSpeedUnit) {
    setTempUnits(newTempUnit);
    setSpeedUnits(newSpeedUnit);
    localStorage.setItem("tempUnits", newTempUnit);
    localStorage.setItem("speedUnits", newSpeedUnit);
  }

  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateTheme();
  }

  async function handleSearchInputChange(input) {
    if (!input || input.trim() === "") {
      setSuggestions([]);
      return;
    }
  
    try {
      const fetchedSuggestions = await getSearchSuggestions(input); // aaaaaaaaaaaaaaa
      setSuggestions(fetchedSuggestions || []);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  }

  return (
    loading ? <div className="App"></div> : (
      <div className="App">
        <Navbar 
          handleSearch={handleSearch}
          handleSearchInputChange={handleSearchInputChange}
          suggestions={suggestions} 
          mode={mode}
          tempUnits={tempUnits}
          speedUnits={speedUnits}
          theme={theme}
          handleModeChange={handleModeChange}
          handleUnitsChange={handleUnitsChange}
          handleThemeChange={handleThemeChange}
        />
        <Body weather={weather} />
      </div>
    )
  );
}

export default App;
