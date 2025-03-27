import "../../global.css";
import "./Panels.css";
import { Cloudy, CloudSun, CloudSunRain, CloudRainWind, CloudSnow, CloudLightning, CloudMoon, CloudMoonRain, Sun, Wind, Moon } from "lucide-react";

function Panels ({ forecast }) {

    if (!forecast || !forecast.list) {
        return <p>Loading forecast...</p>
    }

    {/* Added in case I found suitable icons for the weather forecast */}

    function weatherIcon( weather ) {
        const size = 100;
        const strokeWidth = 2.25;
        const { main, description, icon } = weather.weather[0];
        const windSpeed = weather.wind.speed;
        const isNight = icon.includes("n");
    
        // Wind override — prioritize wind if strong and weather is otherwise calm
        if (windSpeed > 10 && (main === "Clear" || main === "Clouds")) {
            return <Wind size={size} strokeWidth={strokeWidth} />;
        }
    
        if (main === "Clear") {
            return isNight
                ? <Moon size={size} strokeWidth={strokeWidth} />
                : <Sun size={size} strokeWidth={strokeWidth} />;
        }
    
        if (main === "Clouds") {
            if (["few clouds", "scattered clouds"].includes(description)) {
                return isNight
                    ? <CloudMoon size={size} strokeWidth={strokeWidth} />
                    : <CloudSun size={size} strokeWidth={strokeWidth} />;
            }
            return isNight
                ? <CloudMoon size={size} strokeWidth={strokeWidth} />
                : <Cloudy size={size} strokeWidth={strokeWidth} />;
        }
    
        if (main === "Rain") {
            if (description.includes("light")) {
                return isNight
                    ? <CloudMoonRain size={size} strokeWidth={strokeWidth} />
                    : <CloudSunRain size={size} strokeWidth={strokeWidth} />;
            }
            return <CloudRainWind size={size} strokeWidth={strokeWidth} />;
        }
    
        if (main === "Drizzle") {
            return isNight
                ? <CloudMoonRain size={size} strokeWidth={strokeWidth} />
                : <CloudSunRain size={size} strokeWidth={strokeWidth} />;
        }
    
        if (main === "Thunderstorm") {
            return <CloudLightning size={size} strokeWidth={strokeWidth} />;
        }
    
        if (main === "Snow") {
            return <CloudSnow size={size} strokeWidth={strokeWidth} />;
        }
    
        return isNight
            ? <CloudMoon size={size} strokeWidth={strokeWidth} />
            : <Cloudy size={size} strokeWidth={strokeWidth} />;
    }

    return (
        <div>
            {/* Hourly Forecast Panel */}
            <div className="panel forecast">
                <h2>Hourly Forecast</h2>
                <div className="panelList">    
                    {forecast.list.slice(0, 8).map((hour, index) => (
                    <div className="panelListItem" key={index}>
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`}>
                            {index === 0 ? 'Now' : new Date(hour.dt * 1000).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit' 
                            })}
                        </p>
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`} id="tempNo">{hour.main.temp}°</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                            alt={hour.weather[0].description}
                            className="panelCell"
                        />
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`}>💧{hour.pop * 100}%</p>                
                    </div>
                    ))}
                </div>
            </div>

            {/* Daily Forecast Panel */}
            <div className="panel forecast">
                <h2>Daily Forecast</h2>
                <div className="panelList">
                    {forecast.list
                    .filter((_, i) => i % 8 === 0)
                    .map((day, index) => (
                    <div className="panelListItem" key={index}>
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`}>
                            {index === 0 ? 'Today' : new Date(day.dt * 1000)
                            .toLocaleDateString('en-UK', {weekday: 'short', day: 'numeric'})}
                        </p>
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`} id="tempNo">{day.main.temp}°</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt={day.weather[0].description}
                            className="panelCell"
                        />
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`}>💧{day.pop * 100}%</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Panels;