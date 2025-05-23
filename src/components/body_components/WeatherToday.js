
import styles from "./WeatherToday.module.css";
import "../../global.css";
import { Thermometer, Droplets, Droplet, Wind, Sunrise, Sunset, MoveUp, Cloud, Eye, WindArrowDown, Sun, CloudFog } from "lucide-react";
import { processDailyForecast } from "../../utils/DailyForecast";
import { useEffect, useState } from "react";
import { toF, toMph } from "../../utils/UnitsConversions";

const size = 16;
const strokeWidth = 1.5;

function formatGMT(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toUTCString().slice(17, 22);
}

function WeatherToday({ weather, forecast, extra, airQuality }) {
    const maxMobileWidth = 518;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxMobileWidth);

    // Event listener to handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxMobileWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    const getAirQualityLevel = () => {
        if (airQuality.main.aqi === 1) {
            return "Good";
        } else if (airQuality.main.aqi === 2) {
            return "Fair";
        } else if (airQuality.main.aqi === 3) {
            return "Moderate";
        } else if (airQuality.main.aqi === 4) {
            return "Poor";
        } else {
            return "Very Poor";
        }
    };

    const dailyForecast = processDailyForecast(forecast);

    const isC = localStorage.getItem("tempUnits") === "c";
    const isMs = localStorage.getItem("speedUnits") === "m/s";

    const maxTemp = isC ? Math.round(dailyForecast[0].maxTemp) : Math.round(toF(dailyForecast[0].maxTemp));
    const minTemp = isC ? Math.round(dailyForecast[0].minTemp) : Math.round(toF(dailyForecast[0].minTemp));
    const windSpeed = isMs ? Math.round(weather.wind.speed * 10) / 10 : Math.round(toMph(weather.wind.speed) * 10) / 10;
    const visibility = isMs ? Math.round((weather.visibility / 1000) * 10) / 10 : Math.round((weather.visibility / 1609.34) * 10) / 10;

    return (
        <div className="panel">
            <h2>Weather Today</h2>
            {/* proLayout splits it into two columns */}
            <div className={localStorage.getItem("mode") === "pro" ? styles.proLayout : ""}>
                <div>
                    <div className={styles.informationRow}>
                        <Thermometer size={size} strokeWidth={strokeWidth} />
                        <p>High/Low</p>
                        <p>{maxTemp}°/{minTemp}°</p>
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
                            <p>{windSpeed}{isMs ? "m/s" : "mph"}</p>
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
                            {isMobile && <hr />}
                        </>
                    )}
                </div>
                <div>
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
                                <p>{visibility}{isMs ? "km" : "mi"}</p>
                            </div>
                            <hr />
                            <div className={styles.informationRow}>
                                <Sun size={size} strokeWidth={strokeWidth} />
                                <p>UV</p>
                                <p>{Math.round(extra.uv)} ({getUVIndexLevel()})</p>
                            </div>
                            <hr />
                            <div className={styles.informationRow}>
                                <CloudFog size={size} strokeWidth={strokeWidth} />
                                <p>Air Quality</p>
                                <p>{getAirQualityLevel()}</p>
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
            </div>
        </div>
        );
}

export default WeatherToday;