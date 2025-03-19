import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';
import { updateTheme } from './utils/Theme';

function setipLocalStorage() {
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
  useEffect(() => {
    setipLocalStorage();
    updateTheme();
  }
  , []);

  return (
    <div className="App">
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
