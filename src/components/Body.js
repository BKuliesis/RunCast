import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";

function Body({ weather }) {
    return (
        <div className={styles.body}>
            <Header weather={weather} />
            <Panels weather={weather} />
            <WeatherToday weather={weather} />
        </div>
    );
}

export default Body;
