<<<<<<< HEAD
import styles from "./Body.module.css";
import Header from "./body_components/Header";
import WeatherToday from "./body_components/WeatherToday";

function Body({ weather }) {
    return (
        <div className={styles.body}>
            <Header weather={weather} />
            <WeatherToday weather={weather} />
        </div>
=======
import React from 'react';
import Clothing from './Clothing';

function Body() {

    //Temporary test before api working
    const weatherData = {
        temperature: -10,
        isRaining: true,
    };
    return (
        <>
        <Clothing temperature = {weatherData.temperature} isRaining = {weatherData.isRaining} />
        </>
>>>>>>> 15c8c0d (Added clothing recommendation. Does not implement API yet and need to add icons)
    );
}

export default Body;
