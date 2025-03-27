import { useMemo } from 'react';
import styles from './Rating.module.css';

function Rating({ weather }) {
  // Provide default values if weather is missing (to satisfy hooks rule)
  const temperature = weather?.main?.temp ?? 0;
  const condition = weather?.weather?.[0]?.main ?? "Unknown";
  const humidity = weather?.main?.humidity ?? 50;
  const windSpeed = weather?.wind?.speed ?? 0;
  const windUnit = weather?.wind?.unit ?? "m/s";
  const lastRain = weather?.rain ? "recently" : null;

  // 🌡️ Get stored units
  const tempUnits = localStorage.getItem("tempUnits") || "c";

  // Normalize for logic
  const tempC = tempUnits === "f" ? (temperature - 32) * (5 / 9) : temperature;
  const windMS = windUnit === "mph" ? windSpeed / 2.23694 : windSpeed;

  const rating = useMemo(() => {
    let rating = 3;

    if (tempC < -10) rating = 9;
    else if (tempC >= -10 && tempC < 0) rating = 7;
    else if (tempC >= 0 && tempC < 10) rating = 5;
    else if (tempC >= 10 && tempC < 25) rating = 3;
    else if (tempC >= 25 && tempC < 35) rating = 6;
    else if (tempC >= 35) rating = 9;

    const lowerCond = condition.toLowerCase();
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) rating = 10;
    else if (lowerCond.includes("snow")) rating += 2;
    else if (lowerCond.includes("rain") || lowerCond.includes("drizzle")) rating += 1;
    else if (lowerCond.includes("fog")) rating += 1;
    else if (lowerCond.includes("clear")) rating -= 1;

    if (windMS > 12) rating += 3;
    else if (windMS > 8) rating += 2;
    else if (windMS > 5) rating += 1;

    if (humidity < 20 || humidity > 90) rating += 2;
    else if (humidity < 30 || humidity > 70) rating += 1;

    return Math.max(1, Math.min(rating, 10));
  }, [tempC, condition, humidity, windMS]);

  // Stop rendering if weather is actually missing
  if (!weather || !weather.main || !weather.wind || !weather.weather) return null;

  const strokePercentage = (rating / 10) * 100;

  const getStrokeColor = () => {
    if (rating <= 4) return "var(--circle-good-color)";
    if (rating >= 5 && rating <= 7) return "var(--circle-moderate-color)";
    return "var(--circle-severe-color)";
  };

  const getStatusLabel = (temp, humidity, wind, condition) => {
    const lower = condition.toLowerCase();
    let reasons = [];
  
    if (lower.includes("storm") || lower.includes("thunder")) {
      return "Storm risk – avoid running";
    }
  
    if (lower.includes("snow")) {
      reasons.push("Snowy conditions");
    }
  
    if (lower.includes("rain") || lower.includes("drizzle")) {
      reasons.push("Wet and slippery");
    }
  
    if (lower.includes("fog")) {
      reasons.push("Low visibility");
    }
  
    if (temp < 0) {
      reasons.push("Freezing temperatures");
    } else if (temp >= 30) {
      reasons.push("High heat – hydrate well");
    }
  
    if (humidity > 90) {
      reasons.push("Very humid – expect discomfort");
    } else if (humidity > 70) {
      reasons.push("Humid air");
    } else if (humidity < 20) {
      reasons.push("Dry air – stay hydrated");
    }
  
    if (wind > 12) {
      reasons.push("Strong winds");
    } else if (wind > 8) {
      reasons.push("Windy conditions");
    }
  
    if (reasons.length === 0 && lower.includes("clear")) {
      return "Ideal conditions";
    }
  
    return reasons.join(" · ");
  };

  const getSubtext = (temp, humidity, wind, condition, lastRain) => {
    const lower = condition.toLowerCase();
  
    if (lower.includes("storm") || lower.includes("thunder")) {
      return "Avoid outdoor activity until conditions improve.";
    }
  
    if (lower.includes("snow")) {
      return "Trails may be icy – use caution.";
    }
  
    if (lower.includes("rain") || lower.includes("drizzle")) {
      return lastRain
        ? `Rained ${lastRain}, expect wet surfaces.`
        : "Watch for puddles and slippery paths.";
    }
  
    if (lower.includes("fog")) {
      return "Low visibility – wear bright or reflective gear.";
    }
  
    if (humidity > 90) {
      return "High humidity – stay well hydrated.";
    }
  
    if (temp >= 30) {
      return "Heat can build up quickly – slow your pace if needed.";
    }
  
    if (wind > 12) {
      return "Strong winds – consider a more sheltered route.";
    }
  
    if (lower.includes("clear")) {
      return "Perfect day for a run – enjoy!";
    }
  
    return "Conditions vary – check updates before heading out.";
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
          <p className={styles.status}>{getStatusLabel(tempC, humidity, windMS, condition)}</p>
          <p className={styles.subtext}>
            {getSubtext(tempC, humidity, windMS, condition, lastRain)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rating;



