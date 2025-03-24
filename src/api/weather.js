import axios from 'axios';

const API_KEY = "a2ee72491e2b768975ee7b4ea79b2278";

const fetchWeatherData = async (lat, lon, tempUnits) => {
    try {
        const units = tempUnits === "c" ? "metric" : "imperial";
        
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
        );
        
        return response.data;
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
