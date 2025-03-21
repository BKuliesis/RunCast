import styles from './Header.module.css';

function Header({ weather }) {
    console.log(weather);
    return (
        <div className={styles.panel}>
            <h2>Current Weather</h2>
            <p>{weather.name}, {weather.sys.country}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
        </div>
    );
}

export default Header;