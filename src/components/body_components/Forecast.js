import styles from "./Forecast.module.css";
import ClearNight from "../../assets/weather-icons/clear-moon-dm.svg";
import ClearSun from "../../assets/weather-icons/clear-sun-dm.svg";
import CloudyNight from "../../assets/weather-icons/cloudy-moon-dm.svg";
import CloudyRain from "../../assets/weather-icons/rain-dm.svg";
import CloudySun from "../../assets/weather-icons/cloudy-sun-dm.svg";
import Cloudy from "../../assets/weather-icons/cloudy-dm.svg";
import Lightning from "../../assets/weather-icons/lightning-dm.svg";
import Snow from "../../assets/weather-icons/snow-dm.svg";
import Windy from "../../assets/weather-icons/windy-dm.svg";
import { ReactComponent as Drop} from "../../assets/weather-icons/drop.svg";

function Panels ({ forecast }) {

    if (!forecast || !forecast.list) {
        return <p>Loading forecast...</p>
    }

    function weatherIcon( weather ) {
        const style={width: '60px', height: 'auto'};
        const { main, description, icon } = weather.weather[0];
        const windSpeed = weather.wind.speed;
        const isNight = icon.includes("n");
    
        // Wind override — prioritize wind if strong and weather is otherwise calm
        if (localStorage.getItem("speedUnits") === "mph") {
            if (windSpeed > 10 * 2.23694 && (main === "Clear" || main === "Clouds")) {
                return <img src={Windy} alt="Windy" style={style}/>;
            }
        } else {
            if (windSpeed > 10 && (main === "Clear" || main === "Clouds")) {
                return <img src={Windy} alt="Windy" style={style}/>;
            }
        }
    
        if (main === "Clear") {
            return isNight
                ? <img src={ClearNight} alt="Clear Night" style={style}/>
                : <img src={ClearSun} alt="Clear Sun" style={style}/>;
        }
    
        if (main === "Clouds") {
            if (["few clouds", "scattered clouds"].includes(description)) {
                return isNight
                    ? <img src={CloudyNight} alt="Cloudy Night" style={style}/>
                    : <img src={CloudySun} alt="Cloudy Sun" style={style}/>;
            }
            return isNight
                ? <img src={CloudyNight} alt="Cloudy Night" style={style}/>
                : <img src={Cloudy} alt="Cloudy" style={style}/>;
        }
    
        if (main === "Rain") {
            if (description.includes("light")) {
                return isNight
                    ? <img src={CloudyRain} alt="Cloudy Rain" style={style}/>
                    : <img src={CloudyRain} alt="Cloudy Rain" style={style}/>;
            }
            return <img src={CloudyRain} alt="Cloudy Rain" style={style}/>;
        }
    
        if (main === "Drizzle") {
            return isNight
                ? <img src={CloudyRain} alt="Cloudy Rain" style={style}/>
                : <img src={CloudyRain} alt="Cloudy Rain" style={style}/>;
        }
    
        if (main === "Thunderstorm") {
            return <img src={Lightning} alt="Lightning" style={style}/>;
        }
    
        if (main === "Snow") {
            return <img src={Snow} alt="Snow" style={style}/>;
        }
    
        return isNight
            ? <img src={CloudyNight} alt="Cloudy Night" style={style}/>
            : <img src={Cloudy} alt="Cloudy" style={style}/>;
    }

    const processDailyForecast = (forecast) => {
        const dailyData = forecast.list.reduce((acc, entry) => {
            const date = new Date(entry.dt * 1000).toISOString().spliy("T")[0];
            if (!acc[date]) acc[date] = { temp: [], midday: null, pop: 0, entries: 0 };
            acc[date].temps.push(entry.main.temp);
            acc[date].pop += entry.pop;
            acc[date].entries++;

            const hour = new Date(entry.dt * 1000).getUTCHours();
            if (hour === 12) acc[date].midday = entry;

            return acc;   
        }, {});

        return Object.values(dailyData).slice(0, 5).map((day) => ({
            maxTemp: Math.max(...day.temps),
            minTemp: Math.min(...day.temps),
            middayEntry: day.midday || forecast.list.find(e => new Date(e.dt * 1000).getUTCHours() === 12),
            pop: Math.round((day.pop / day.entries) * 100),
        }));
    };

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
                <div className={styles.panelList} style={{maxHeight: 'fit-content', overflow: 'hidden'}}>
                    {forecast.list
                    .filter((_, i) => i % 8 === 0)
                    .map((day, index) => (
                    <div className={styles.panelListItem} key={index}>
                        <p className={`${styles.panelCell} ${index === 0 ? styles.bold : ""}`}>
                            {index === 0 ? 'Today' : new Date(day.dt * 1000)
                            .toLocaleDateString('en-UK', {
                                weekday: 'short', 
                                day: 'numeric',
                                timeZone: 'GMT'
                            })}
                        </p>
                        <p className={`${styles.panelCell} ${styles.temp} ${index === 0 ? styles.bold : ""}`}><span className="number">{day.main.temp_max}/{day.main.temp_min}</span>°</p>
                        <p className={styles.panelCell}>{weatherIcon(day)}</p>
                        <p className={`${styles.panelCell} ${styles.drop} ${index === 0 ? styles.bold : ""}`}><Drop />{Math.round(day.pop * 100)}%</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Panels;