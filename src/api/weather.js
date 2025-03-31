import axios from 'axios';

const OPENWEATHER_API_KEY = "a2ee72491e2b768975ee7b4ea79b2278";
const WEATHERAPI_KEY = "fec1915ba4454050a19133641253103"; 

const fetchWeatherData = async (lat, lon, tempUnits) => {
    try {
        const units = tempUnits === "c" ? "metric" : "imperial";
        const weatherapiUnits = tempUnits === "c" ? "c" : "f";

        const [weatherResponse, forecastResponse, weatherapiResponse] = await Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`),
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${lat},${lon}`)
        ]);

        return {
            weatherResponse: weatherResponse.data,
            forecastResponse: forecastResponse.data,
            extra: weatherapiResponse.data,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};


const fetchHistoricalRain = async (location) => {
    try {
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const response = await axios.get(
            `https://api.weatherapi.com/v1/history.json?key=${WEATHERAPI_KEY}&q=${location}&dt=${today}`
        );

        const hourlyData = response.data.forecast.forecastday[0].hour;
        const now = new Date();
        const currentHour = now.getHours();


        let recentRainHours = 0;
        for (let i = Math.max(0, currentHour - 6); i < currentHour; i++) {
            if (hourlyData[i]?.precip_mm > 0) {
                recentRainHours++;
            }
        }

        return {
            rainedInLast6Hours: recentRainHours > 0,
            rainHoursCount: recentRainHours
        };
    } catch (error) {
        console.error('Error fetching historical rain:', error);
        return {
            rainedInLast6Hours: false,
            rainHoursCount: 0
        };
    }
};

const fetchCoordinates = async (location, tempUnits) => {
    try {
        const coordResponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`
        );

        if (coordResponse.data.length === 0) {
            console.log("Location not found");
            return null;
        }

        const { lat, lon } = coordResponse.data[0];

        const currentWeather = await fetchWeatherData(lat, lon, tempUnits);

        const historicalRain = await fetchHistoricalRain(location);

        return {
            ...currentWeather,
            recentRain: historicalRain 
        };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};

export default fetchCoordinates;

