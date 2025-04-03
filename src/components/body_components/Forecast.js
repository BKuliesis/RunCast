import styles from "./Forecast.module.css";
import ClearNightDM from "../../assets/weather-icons/clear-moon-dm.svg";
import ClearSunDM from "../../assets/weather-icons/clear-sun-dm.svg";
import CloudyNightDM from "../../assets/weather-icons/cloudy-moon-dm.svg";
import CloudyRainDM from "../../assets/weather-icons/rain-dm.svg";
import CloudySunDM from "../../assets/weather-icons/cloudy-sun-dm.svg";
import CloudyDM from "../../assets/weather-icons/cloudy-dm.svg";
import LightningDM from "../../assets/weather-icons/lightning-dm.svg";
import SnowDM from "../../assets/weather-icons/snow-dm.svg";
import WindyDM from "../../assets/weather-icons/windy-dm.svg"
import ClearNightLM from "../../assets/weather-icons/clear-moon-lm.svg";
import ClearSunLM from "../../assets/weather-icons/clear-sun-lm.svg";
import CloudyNightLM from "../../assets/weather-icons/cloudy-moon-lm.svg";  
import CloudyRainLM from "../../assets/weather-icons/rain-lm.svg";
import CloudySunLM from "../../assets/weather-icons/cloudy-sun-lm.svg";
import CloudyLM from "../../assets/weather-icons/cloudy-lm.svg";
import LightningLM from "../../assets/weather-icons/lightning-lm.svg";
import SnowLM from "../../assets/weather-icons/snow-lm.svg";
import WindyLM from "../../assets/weather-icons/windy-lm.svg";
import { ReactComponent as Drop } from "../../assets/weather-icons/drop.svg";
import { processDailyForecast } from "../../utils/DailyForecast";

function Forecast ({ forecast }) {
    const isLightTheme = localStorage.getItem("theme") === "light";

    if (!forecast || !forecast.list) {
        return <p>Loading forecast...</p>
    }

    function weatherIcon( weather ) {
        const { main, description, icon } = weather.weather[0];
        const windSpeed = weather.wind.speed;
        const isNight = icon.includes("n");
    
        // Wind override — prioritize wind if strong and weather is otherwise calm
        if (localStorage.getItem("speedUnits") === "mph") {
            if (windSpeed > 10 * 2.23694 && (main === "Clear" || main === "Clouds")) {
                return <img src={isLightTheme ? WindyLM : WindyDM} alt="Windy" className={styles.weatherIcon}/>;
            }
        } else {
            if (windSpeed > 10 && (main === "Clear" || main === "Clouds")) {
                return <img src={isLightTheme ? WindyLM : WindyDM} alt="Windy" className={styles.weatherIcon}/>;
            }
        }
    
        if (main === "Clear") {
            return isNight
                ? <img src={isLightTheme ? ClearNightLM : ClearNightDM} alt="Clear Night" className={styles.weatherIcon}/>
                : <img src={isLightTheme ? ClearSunLM : ClearSunDM} alt="Clear Sun" className={styles.weatherIcon}/>;
        }
    
        if (main === "Clouds") {
            if (["few clouds", "scattered clouds"].includes(description)) {
                return isNight
                    ? <img src={isLightTheme ? CloudyNightLM : CloudyNightDM} alt="Cloudy Night" className={styles.weatherIcon}/>
                    : <img src={isLightTheme ? CloudySunLM : CloudySunDM} alt="Cloudy Sun" className={styles.weatherIcon}/>;
            }
            return isNight
                ? <img src={isLightTheme ? CloudyNightLM : CloudyNightDM} alt="Cloudy Night" className={styles.weatherIcon}/>
                : <img src={isLightTheme ? CloudyLM : CloudyDM} alt="Cloudy" className={styles.weatherIcon}/>;
        }
    
        if (main === "Rain") {
            return <img src={isLightTheme ? CloudyRainLM : CloudyRainDM} alt="Cloudy Rain" className={styles.weatherIcon}/>;
        }
    
        if (main === "Drizzle") {
            return <img src={isLightTheme ? CloudyRainLM : CloudyRainDM} alt="Cloudy Rain" className={styles.weatherIcon}/>;
        }
    
        if (main === "Thunderstorm") {
            return <img src={isLightTheme ? LightningLM : LightningDM} alt="Lightning" className={styles.weatherIcon}/>;
        }
    
        if (main === "Snow") {
            return <img src={isLightTheme ? SnowLM : SnowDM} alt="Snow" className={styles.weatherIcon}/>;
        }
    
        return isNight
            ? <img src={isLightTheme ? CloudyNightLM : CloudyNightDM} alt="Cloudy Night" className={styles.weatherIcon}/>
            : <img src={isLightTheme ? CloudyLM : CloudyDM} alt="Cloudy" className={styles.weatherIcon}/>;
    }

    return (
        <div className={styles.panels}>
            <div className="panel" style={{paddingRight: "12px"}}>
                <h2>Hourly Forecast</h2>
                <div className={styles.panelList}>    
                    {forecast.list.slice(0, 8).map((hour, index) => (
                    <div className={styles.panelListItem} key={index}>
                        <p className={`${styles.panelCell} ${index === 0 ? styles.bold : ""}`}>
                            {index === 0 ? 'Now' : new Date(hour.dt * 1000).toLocaleTimeString('en-UK', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'GMT'
                            })}
                        </p>
                        <p className={`${styles.panelCell} ${styles.temp} ${index === 0 ? styles.bold : ""}`}><span className="number">{hour.main.temp}</span>°</p>
                        <p className={styles.panelCell}>{weatherIcon(hour)}</p>
                        <p className={`${styles.panelCell} ${styles.drop} ${index === 0 ? styles.bold : ""}`}><Drop />{Math.round(hour.pop * 100)}%</p>                
                    </div>
                    ))}
                </div>
            </div>

            <div className="panel">
                <h2>Daily Forecast</h2>
                <div className={styles.panelList} style={{ maxHeight: 'fit-content', overflow: 'hidden' }}>
                    {processDailyForecast(forecast).map((day, index) => (
                        <div className={`${styles.panelListItem} ${styles.dailyPanelListItem}`} key={index}>
                            <p className={`${styles.panelCell} ${index === 0 ? styles.bold : ""}`}>
                                {index === 0 ? 'Today' : new Date(day.middayEntry.dt * 1000).toLocaleDateString('en-UK', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    timeZone: 'GMT'
                                })}
                            </p>
                            <p className={`${styles.panelCell} ${styles.temp} ${styles.minMax} ${index === 0 ? styles.bold : ""}`}>
                                <div>
                                    <span className="number">{Math.round(day.maxTemp)}</span>°
                                </div>
                                <span className={styles.min}>/</span>
                                <div className={styles.min}>
                                    <span className="number">{Math.round(day.minTemp)}</span>°
                                </div>
                            </p>
                            <p className={styles.panelCell}>{weatherIcon(day.middayEntry)}</p>
                            <p className={`${styles.panelCell} ${styles.drop} ${index === 0 ? styles.bold : ""}`}>
                                <Drop />{day.pop}%
                            </p>
                        </div>
                    ))}
                </div>
            </div>  
        </div>
    );
}

export default Forecast;