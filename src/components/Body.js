import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";
import PanelsHourly from "./body_components/Panels";

function Body({ weather, forecast }) {

    return (
        <div className={styles.body}>
            <Header weather={weather} />
            <WeatherToday weather={weather} />
            <PanelsHourly forecast={forecast} />
        </div>
    );
}

export default Body;
