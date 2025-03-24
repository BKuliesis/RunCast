import styles from './Rating.module.css';

function Rating({ weather }) {
  if (!weather) return null;

  const temperature = weather.main.temp;
  const condition = weather.weather[0].main;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const lastRain = weather.rain ? "recently" : null;

  // Rating logic using all factors
  const calculateWeatherRating = (temp, cond, humidity, wind) => {
    let rating = 3;

    // 🌡️ Temperature logic
    if (temp < -10) rating = 9;
    else if (temp >= -10 && temp < 0) rating = 7;
    else if (temp >= 0 && temp < 10) rating = 5;
    else if (temp >= 10 && temp < 25) rating = 3;
    else if (temp >= 25 && temp < 35) rating = 6;
    else if (temp >= 35) rating = 9;

    // 🌥️ Weather condition
    const lowerCond = cond.toLowerCase();
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) rating = 10;
    else if (lowerCond.includes("snow")) rating += 2;
    else if (lowerCond.includes("rain") || lowerCond.includes("drizzle")) rating += 1;
    else if (lowerCond.includes("fog")) rating += 1;
    else if (lowerCond.includes("clear")) rating -= 1;

    // 💨 Wind speed (m/s or mph depending on user setting)
    if (wind > 12) rating += 3;
    else if (wind > 8) rating += 2;
    else if (wind > 5) rating += 1;

    // 💧 Humidity
    if (humidity < 30 || humidity > 70) rating += 1;

    return Math.max(1, Math.min(rating, 10));
  };

  // Status label
  const getStatusLabel = (cond, rating) => {
    const lower = cond.toLowerCase();

    if (lower.includes("rain") || lower.includes("drizzle")) return "Wet Conditions";
    if (lower.includes("snow")) return "Snowy Conditions";
    if (lower.includes("storm") || lower.includes("thunder")) return "Storm Risk";
    if (lower.includes("fog")) return "Low Visibility";
    if (lower.includes("clear")) {
      return rating <= 3 ? "Ideal Conditions" : "Warm & Dry";
    }
    if (lower.includes("cloud")) return "Cloudy";
    return "Check Conditions";
  };

  const rating = calculateWeatherRating(temperature, condition, humidity, windSpeed);
  const strokePercentage = (rating / 10) * 100;

  const getStrokeColor = () => {
    if (rating <= 3) return "var(--circle-safe-color)";
    if (rating === 4) return "var(--circle-moderate-color)";
    if (rating >= 5 && rating <= 7) return "var(--circle-warn-color)";
    return "var(--circle-severe-color)";
  };

  return (
    <div className={styles.ratingContainer}>
      <h4 className={styles.title}>Running Conditions</h4>
      <div className={styles.content}>
        <div className={styles.circleWrapper}>
          <svg className={styles.circleSvg} viewBox="0 0 36 36">
            <path
              className={styles.bg}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
            <path
              className={styles.progress}
              d="M18 2a16 16 0 1 1 0 32"
              style={{
                stroke: getStrokeColor(),
                strokeDasharray: `${strokePercentage}, 100`,
              }}
            />
          </svg>
          <span className={styles.number}>{rating}</span>
        </div>
        <div className={styles.details}>
          <p className={styles.status}>{getStatusLabel(condition, rating)}</p>
          <p className={styles.subtext}>
            {lastRain
              ? `Rained ${lastRain}, expect wet paths.`
              : condition.toLowerCase().includes("clear")
              ? "Ideal time to run."
              : "Check for local updates."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rating;

