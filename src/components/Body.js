import { useState, useEffect } from "react";
import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";
import Forecast from "./body_components/Forecast";
import RunningConditions from './body_components/RunningConditions';
import Clothing from './body_components/Clothing';

function Body({ weather }) {
    const maxMobileWidth =  935;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxMobileWidth);

    // Check if the window is resized to mobile or desktop
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxMobileWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }
    , []);

    return (
        !isMobile ? (
            // Desktop layout
            <div className={styles.body}>
                <div>
                    <Header weather={weather.weather} />
                    {/* If pro mode, weather today is in left column */}
                    {localStorage.getItem('mode') === 'pro' && (
                        <WeatherToday weather={weather.weather} forecast={weather.forecast} extra={weather.extra} airQuality={weather.airQuality} />
                    )}
                    <Forecast forecast={weather.forecast} />
                </div>
                <div>
                    {/* If not pro mode, weather today is in right column */}
                    {localStorage.getItem('mode') !== 'pro' && (
                        <WeatherToday weather={weather.weather} forecast={weather.forecast} extra={weather.extra} airQuality={weather.airQuality} />
                    )}
                    <RunningConditions weather={weather.weather} recentRain={weather.recentRain} />
                    <Clothing weather={weather.weather} recentRain={weather.recentRain} /> 
                </div>
            </div>
        ) : (
            // Mobile layout
            <div className={styles.body}>
                <Header weather={weather.weather} />
                <WeatherToday weather={weather.weather} forecast={weather.forecast} extra={weather.extra} airQuality={weather.airQuality} />
                <RunningConditions weather={weather.weather} recentRain={weather.recentRain} />
                <Clothing weather={weather.weather} recentRain={weather.recentRain} /> 
                <Forecast forecast={weather.forecast} />
            </div>
        )
    );
}

export default Body;