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
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setupLocalStorage();
    updateTheme();
    setLoading(false);
  }
  , []);

  const handleSearch = (search) => {
    setWeather(getWeather(search));
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
