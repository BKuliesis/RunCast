import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    // Fetch weather data using latitude and longitude
    const fetchWeatherData = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a2ee72491e2b768975ee7b4ea79b2278`
            );
            setWeatherData(response.data);
            setError(null);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError("Weather data could not be retrieved for this area.");
            setWeatherData(null);
        }
    };

    // Fetch coordinates (latitude and longitude) using the Geocoding API
    const fetchCoordinates = async () => {
        try {
            // Make a request to OpenWeatherMap's Geocoding API
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city},GB&appid=a2ee72491e2b768975ee7b4ea79b2278`
            );

            if (response.data.cod === "404") {
                setError("City or area not found.");
                setWeatherData(null);
                return;
            }

            const { lat, lon } = response.data.coord; // Extract latitude and longitude from the response
            fetchWeatherData(lat, lon); // Fetch weather data using the coordinates
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            setError("City or area not found.");
            setWeatherData(null);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCoordinates(); // Fetch coordinates and then the weather data
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city or area name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>} {/* Display error message */}
            {weatherData ? (
                <>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Feels like: {weatherData.main.feels_like}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;