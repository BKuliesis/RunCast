
import styles from "./WeatherToday.module.css";
import "../../global.css";
import { Thermometer, Droplet, Wind, Sunrise, Sunset } from "lucide-react";

const size = 16;
const strokeWidth = 1.5;

function formatGMT(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toUTCString().slice(17, 22);
}

function WeatherToday({ weather }) {
    return (
        <div className="panel">
            <h2>Weather Today</h2>
            <div className={styles.informationRow}>
                <Thermometer size={size} strokeWidth={strokeWidth} />
                <p>High/Low</p>
                <p>{weather.main.temp_min}°/{weather.main.temp_max}°</p>
            </div>
            <hr />
            <div className={styles.informationRow}>
                <Droplet size={size} strokeWidth={strokeWidth} />
                <p>Humidity</p>
                <p>{weather.main.humidity}%</p>
            </div>
            <hr />
            <div className={styles.informationRow}>
                <Wind size={size} strokeWidth={strokeWidth} />
                <p>Wind</p>
                <p>{weather.wind.speed}{weather.wind.unit === "mph" ? "mph" : "m/s"}</p>
            </div>
            <hr />
            <div className={styles.informationRow}>
                <Sunrise size={size} strokeWidth={strokeWidth} />
                <p>Sunrise</p>
                <p>{formatGMT(weather.sys.sunrise)} GMT</p>
            </div>
            <hr />
            <div className={styles.informationRow}>
                <Sunset size={size} strokeWidth={strokeWidth} />
                <p>Sunset</p>
                <p>{formatGMT(weather.sys.sunset)} GMT</p>
            </div>
        </div>
    );
}

export default WeatherToday;