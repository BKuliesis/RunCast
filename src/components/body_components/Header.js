import styles from './Header.module.css';
import { Cloudy, CloudSun, CloudSunRain, CloudRainWind, CloudSnow, CloudLightning, CloudMoon, CloudMoonRain, Sun, Wind, Moon } from "lucide-react";

function Header({ weather }) {
    function getDescription() {
        const { description } = weather.weather[0];
    
        const overrides = {
            "overcast clouds": "Overcast",
            "few clouds": "Partly Cloudy",
            "scattered clouds": "Mostly Cloudy",
            "broken clouds": "Cloudy",
            "clear sky": "Clear",
            "light rain": "Light Rain",
            "moderate rain": "Rain",
            "heavy intensity rain": "Heavy Rain",
            "very heavy rain": "Heavy Rain",
            "light snow": "Light Snow",
            "heavy snow": "Heavy Snow",
        };
    
        const normalized = description.toLowerCase();
        const friendly = overrides[normalized] || description;
    
        // Capitalize every word
        return friendly
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    

    function getIcon() {
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

    function getBackground() {
        const { main, description, icon } = weather.weather[0];
        const isNight = icon.includes("n");
    
        if (main === "Clear") {
            return isNight
                ? "https://images.unsplash.com/photo-1652104477945-c8bb3b93a9e4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
    
        if (main === "Clouds") {
            if (["few clouds", "scattered clouds"].includes(description)) {
                return isNight
                    ? "https://images.unsplash.com/photo-1693267438751-69f4aa7ffd19?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            }
            return isNight 
                ? "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://media.gettyimages.com/id/1145484204/video/moving-rain-cloudy-with-overcast-sky.jpg?s=640x640&k=20&c=wbiHD5-I6sE3RlkNUp0UXoGFhGW7xpV_372BF7aSRxE=";
        }
    
        if (main === "Rain" || main === "Drizzle") {
            return isNight
                ? "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://plus.unsplash.com/premium_photo-1671229652411-4468b946b787?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
    
        if (main === "Thunderstorm") {
            return "https://images.unsplash.com/photo-1622029688399-b797269873e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
    
        if (main === "Snow") {
            return "https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
    
        return isNight 
            ? "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : "https://media.gettyimages.com/id/1145484204/video/moving-rain-cloudy-with-overcast-sky.jpg?s=640x640&k=20&c=wbiHD5-I6sE3RlkNUp0UXoGFhGW7xpV_372BF7aSRxE=";
    }    
    
    function formatGMT() {
        const date = new Date(weather.dt * 1000);
        return date.toUTCString().slice(17, 22);
    }

    return (
        <div className={`panel ${styles.header}`}
        style={{
            backgroundImage: `url(${getBackground()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className={styles.heading}>
                <h2>{weather.name}, {weather.sys.country}</h2>
                <h3>As of {formatGMT()} GMT</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.info}>
                    <h1>{weather.main.temp}°</h1>
                    <h2>{getDescription()}</h2>
                    <h2>Feels like: {weather.main.feels_like}°</h2>
                </div>
                <div className={styles.weatherIcon}>
                    {getIcon()}
                </div>
            </div>
        </div>
    );
}

export default Header;