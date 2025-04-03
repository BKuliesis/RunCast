
import styles from "./WeatherToday.module.css";
import "../../global.css";
import { Thermometer, Droplets, Droplet, Wind, Sunrise, Sunset, MoveUp, Cloud, Eye, WindArrowDown, Sun } from "lucide-react";
import { processDailyForecast } from "../../utils/DailyForecast";

const size = 16;
const strokeWidth = 1.5;

function formatGMT(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toUTCString().slice(17, 22);
}

function WeatherToday({ weather, forecast, extra }) {
    const getUVIndexLevel = () => {
        if (extra.uv <= 2) {
            return "Low";
        } else if (extra.uv <= 5) {
            return "Moderate";
        } else if (extra.uv <= 7) {
            return "High";
        } else if (extra.uv <= 10) {
            return "Very High";
        } else {
            return "Extreme";
        }
    };

    const dailyForecast = processDailyForecast(forecast);

    return (
        <div className="panel">
            <h2>Weather Today</h2>
            <div className={styles.informationRow}>
                <Thermometer size={size} strokeWidth={strokeWidth} />
                <p>High/Low</p>
                <p>{dailyForecast[0].maxTemp}°/{dailyForecast[0].minTemp}°</p>
            </div>
            <hr />
            <div className={styles.informationRow}>
                <Droplets size={size} strokeWidth={strokeWidth} />
                <p>Precipitation</p>
                <p>{dailyForecast[0].pop}%</p>
            </div>
            <hr />
            {localStorage.getItem("mode") === "pro" && (
                <>
                    <div className={styles.informationRow}>
                        <Droplet size={size} strokeWidth={strokeWidth} />
                        <p>Humidity</p>
                        <p>{weather.main.humidity}%</p>
                    </div>
                    <hr />
                    <div className={styles.informationRow}>
                        <Droplet size={size} strokeWidth={strokeWidth} />
                        <p>Dew Point</p>
                        <p>{localStorage.getItem("tempUnits") === "c" ? Math.round(extra.dewpoint_c) : Math.round(extra.dewpoint_f)}°</p>
                    </div>
                    <hr />
                </>
            )}
            <div className={styles.informationRow}>
                <Wind size={size} strokeWidth={strokeWidth} />
                <p>Wind</p>
                <div className={styles.wind}>
                    <MoveUp size={size} strokeWidth={strokeWidth} style={{ transform: `rotate(${weather.wind.deg}deg)` }} />
                    <p>{weather.wind.speed}{weather.wind.unit === "mph" ? "mph" : "m/s"}</p>
                </div>
            </div>
            <hr />
            {localStorage.getItem("mode") === "pro" && (
                <>
                    <div className={styles.informationRow}>
                        <WindArrowDown size={size} strokeWidth={strokeWidth} />
                        <p>Pressure</p>
                        <p>{weather.main.pressure}hPa</p>
                    </div>
                    <hr />
                </>
            )}
            {localStorage.getItem("mode") === "pro" && (
                <>
                    <div className={styles.informationRow}>
                        <Cloud size={size} strokeWidth={strokeWidth} />
                        <p>Cloud Coverage</p>
                        <p>{weather.clouds.all}%</p>
                    </div>
                    <hr />
                    <div className={styles.informationRow}>
                        <Eye size={size} strokeWidth={strokeWidth} />
                        <p>Visibility</p>
                        <p>{weather.wind.unit === "m/s" ? `${Math.round((weather.visibility / 1000) * 10) / 10}km` : `${Math.round((weather.visibility / 1609.34) * 10) / 10}mi`}</p>
                    </div>
                    <hr />
                    <div className={styles.informationRow}>
                        <Sun size={size} strokeWidth={strokeWidth} />
                        <p>UV</p>
                        <p>{Math.round(extra.uv)} ({getUVIndexLevel()})</p>
                    </div>
                    <hr />
                </>
            )}
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