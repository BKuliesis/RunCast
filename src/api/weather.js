import axios from 'axios';

const fetchWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a2ee72491e2b768975ee7b4ea79b2278`
        );
        return response.data;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

// Fetch coordinates (latitude and longitude) using the Geocoding API
const fetchCoordinates = async (location) => {
    try {
        // Make a request to OpenWeatherMap's Geocoding API
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location},GB&appid=a2ee72491e2b768975ee7b4ea79b2278`
        );

        if (response.data.cod === "404") {
            console.log("City or area not found.");
            return;
        }

        const { lat, lon } = response.data.coord; // Extract latitude and longitude from the response
        return fetchWeatherData(lat, lon); // Fetch weather data using the coordinates
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};

export default fetchCoordinates;