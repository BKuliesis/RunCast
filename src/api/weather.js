import axios from 'axios';

const API_KEY = "88ff4e3dba17d9f3a8b91e6f269b6290";

const fetchWeatherData = async (lat, lon, tempUnits) => {
    try {
        const units = tempUnits === "c" ? "metric" : "imperial";
        
        const [weatherResponse, forecastResponse] = await Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`)
        ]); 
        
        return {
            weatherResponse: weatherResponse.data,
            forecastResponse: forecastResponse.data,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

const fetchCoordinates = async (location, tempUnits) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
        );

        if (response.data.length === 0) {
            console.log("Location not found");
            return null;
        }

        const { lat, lon } = response.data[0];
        return fetchWeatherData(lat, lon, tempUnits);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};

export default fetchCoordinates;
