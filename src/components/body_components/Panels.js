import styles from "./Panels.module.css";

function Panels ({ weather }) {

    return (
        <div>
            {/* Hourly Forecast Panel */}
            <div className={styles.panel}>
                <h2>Hourly Forecast</h2>
                <div className={styles.panelList}>
                    <p>{weather.main.temp}°</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                    />
                    <p>{weather.pop * 100}%</p>
                </div>
            </div>
        </div>
    );
}

export default Panels;


// function Body() {
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [forecast, setForecast] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [location, setLocation] = useState("London"); // Default location

//     useEffect(() => {
//         fetchWeatherData(location);
//     }, []);

//     const fetchWeatherData = async (city) => {
//         try {
//             setLoading(true);

//         // Fetch both current weather and forecast data
//         const [currentResponse, forecastResponse] = await Promise.all([
//             axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`),
//             axios.get(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`),
//         ]);

//         setCurrentWeather(currentResponse.data);
//         setForecast(forecastResponse.data);
//         setLoading(false);
//         } catch (error) {
//             console.error("Error fetching weather data:", error);
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             {/* Search Box */}
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Enter City..."
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                 />
//                 <button onClick={() => fetchWeatherData(location)}>Search</button>
//             </div>

//         {loading ? (
//             <p>Loading...</p>
//         ) : currentWeather && forecast ? (
//             <>
//             {/* Current Weather Panel */}
//             <div className={styles.panel}>
//                 <h2>Current Weather</h2>
//                 <p>{currentWeather.name}, {currentWeather.sys.country}</p>
//                 <p>{currentWeather.main.temp}°C</p>
//                 <p>{currentWeather.weather[0].description}</p>
//                 <img
//                     src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
//                     alt={currentWeather.weather[0].description}
//                 />
//             </div>

//             {/* Hourly Forecast Panel */}
//             <div className={styles.panel}>
//                 <h2>Hourly Forecast</h2>
//                 <div className={styles.panelList}>
//                     {forecast.list.slice(0, 10).map((hour, index) => (
//                     <div className={styles.panelCell} key={index}>
//                         <p>
//                             {new Date(hour.dt * 1000).toLocaleTimeString([], {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                             })}
//                         </p>
//                         <p>{hour.main.temp}°C</p>
//                         <img
//                             src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
//                             alt={hour.weather[0].description}
//                         />
//                         <p>{hour.pop * 100}%</p>
//                     </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Daily Forecast Panel */}
//             <div className={styles.panel}>
//                 <h2>Daily Forecast</h2>
//                 <div className={styles.panelList}>
//                     {forecast.list
//                         .filter((_, i) => i % 8 ===0) 
//                         .map((day, index) => (
//                             <div className={styles.panelCell} key={index}>
//                                 <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
//                                 <p>{day.main.temp}°C</p>
//                                 <img
//                                     src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                                     alt={day.weather[0].description}
//                                 />
//                                 <p>{day.pop * 100}%</p>
//                             </div>
//                     ))}
//                 </div>
//             </div>
//             </>
//         ) : (
//             <p>No data available.</p>
//         )}
//         </div>
//     );
// }