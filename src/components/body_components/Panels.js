import "../../global.css";
import "./Panels.css";

function Panels ({ forecast }) {

    if (!forecast || !forecast.list) {
        return <p>Loading forecast...</p>
    }

    {/* Added in case I found suitable icons for the weather forecast */}

    function weatherIcon( weather ) {
        const style={width: '60px', height: 'auto'};
        const { main, description, icon } = weather.weather[0];
        const windSpeed = weather.wind.speed;
        const isNight = icon.includes("n");
    
        // Wind override — prioritize wind if strong and weather is otherwise calm
        if (windSpeed > 10 && (main === "Clear" || main === "Clouds")) {
            return <img src="/assets/windy.svg" alt="Windy" style={style}/>;
        }
    
        if (main === "Clear") {
            return isNight
                ? <img src="/assets/clear-night.svg" alt="Clear Night" style={style}/>
                : <img src="/assets/clear-sun.svg" alt="Clear Sun" style={style}/>;
        }
    
        if (main === "Clouds") {
            if (["few clouds", "scattered clouds"].includes(description)) {
                return isNight
                    ? <img src="/assets/cloudy-night.svg" alt="Cloudy Night" style={style}/>
                    : <img src="/assets/cloudy-sun.svg" alt="Cloudy Sun" style={style}/>;
            }
            return isNight
                ? <img src="/assets/cloudy-night.svg" alt="Cloudy Night" style={style}/>
                : <img src="/assets/cloudy.svg" alt="Cloudy" style={style}/>;
        }
    
        if (main === "Rain") {
            if (description.includes("light")) {
                return isNight
                    ? <img src="assets/cloudy-rain-night.svg" alt="Cloudy Rain" style={style}/>
                    : <img src="/assets/cloudy-rain-sun.svg" alt="Cloudy Rain" style={style}/>;
            }
            return <img src="/assets/cloudy-rain.svg" alt="Cloudy Rain" style={style}/>;
        }
    
        if (main === "Drizzle") {
            return isNight
                ? <img src="assets/cloudy-rain-night.svg" alt="Cloudy Rain" style={style}/>
                : <img src="/assets/cloudy-rain-sun.svg" alt="Cloudy Rain" style={style}/>;
        }
    
        if (main === "Thunderstorm") {
            return <img src="/assets/lightning.svg" alt="Lightning" style={style}/>;
        }
    
        if (main === "Snow") {
            return <img src="/assets/snow.svg" alt="Snow" style={style}/>;
        }
    
        return isNight
            ? <img src="/assets/cloudy-night.svg" alt="Cloudy Night" style={style}/>
            : <img src="/assets/cloudy.svg" alt="Cloudy" style={style}/>;
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
                        <p className="panelCell">{weatherIcon(hour)}</p>
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
                        <p className="panelCell">{weatherIcon(day)}</p>
                        <p className={`panelCell ${index === 0 ? "bold" : ""}`}>💧{day.pop * 100}%</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Panels;