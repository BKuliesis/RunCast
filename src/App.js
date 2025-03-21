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
    localStorage.setItem("tempUnits", "celcius");
  }
  if (!localStorage.getItem("speedUnits")) {
    localStorage.setItem("speedUnits", "kilometers");
  }
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "system");
  }
}

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function inititalize() {
      setupLocalStorage();
      updateTheme();
      await handleSearch("London");
      setLoading(false);
    }
    inititalize();
  }
  , []);

  async function handleSearch (search) {
    const weather = await getWeather(search);
    if (!weather) {
      return;
    }
    setWeather(weather);
  }

  return (
    loading ? null : (
      <div className="App">
        <Navbar handleSearch={handleSearch} />
        <Body weather={weather} />
        <Footer />
      </div>
    )
  );
}

export default App;
