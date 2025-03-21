function Header({ weather }) {
    return (
        <div className={styles.panel}>
            <h2>Current Weather</h2>
            <p>{currentWeather.name}, {currentWeather.sys.country}</p>
            <p>{currentWeather.main.temp}°C</p>
            <p>{currentWeather.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                alt={currentWeather.weather[0].description}
            />
        </div>
    );
}

export default Header;