import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";
import Clothing from './body_components/Clothing';
import Forecast from "./body_components/Forecast";
import Rating from './body_components/Rating';
import { useState, useEffect } from "react";

function Body({ weather }) {
    const maxMobileWidth =  935;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxMobileWidth);

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
            <div className={styles.body}>
                <div>
                    <Header weather={weather.weather} />
                    <Forecast forecast={weather.forecast} />
                </div>
                <div>
                    <WeatherToday weather={weather.weather} forecast={weather.forecast} extra={weather.extra} />
                    <Rating weather={weather.weather} recentRain={weather.recentRain} />
                    <Clothing weather={weather.weather} /> 
                </div>
            </div>
        ) : (
            <div className={styles.body}>
                <Header weather={weather.weather} />
                <WeatherToday weather={weather.weather} forecast={weather.forecast} extra={weather.extra} />
                <Rating weather={weather.weather} recentRain={weather.recentRain} />
                <Clothing weather={weather.weather} /> 
                <Forecast forecast={weather.forecast} />
            </div>
        )
    );
}

export default Body;