import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";
import Clothing from './body_components/Clothing';

function Body({ weather }) {
    return (
        <div className={styles.body}>
            <Header weather={weather} />
            <WeatherToday weather={weather} />
            <Clothing weather={weather} /> 
        </div>
    );
}

export default Body;