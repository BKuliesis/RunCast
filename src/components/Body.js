import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";
import Clothing from './body_components/Clothing';
import Forecast from "./body_components/Forecast";
function Body({ weather }) {
    return (
        <div className={styles.body}>
            <Header weather={weather.weather} />
            <WeatherToday weather={weather.weather} />
            <Forecast forecast={weather.forecast} />
            <Clothing weather={weather.weather} /> 
        </div>
    );
}

export default Body;