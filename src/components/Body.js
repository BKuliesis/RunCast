import Header from './body_components/Header';
import WeatherToday from './body_components/WeatherToday';
import Rating from './body_components/Rating';
import styles from './Body.module.css';

function Body({ weather }) {
  if (!weather) return null;

  return (
    <main className={styles.body}>
      <Header weather={weather} />

      <div className={styles.infoRow}>
        <WeatherToday weather={weather} />
        <Rating weather={weather} />
      </div>
    </main>
  );
}

export default Body;
