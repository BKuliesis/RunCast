import { useMemo } from 'react';
import styles from './Rating.module.css';
import {
  Thermometer,
  Droplet,
  Droplets,
  Wind
} from 'lucide-react';

// This component calculates and displays a running conditions rating based on weather data.
function Rating({ weather, recentRain }) {
  const temperature = weather?.main?.temp ?? 0;
  const condition = weather?.weather?.[0]?.main ?? "Unknown";
  const humidity = weather?.main?.humidity ?? 50;
  const windSpeed = weather?.wind?.speed ?? 0;
  const windUnit = weather?.wind?.unit ?? "m/s";
  const tempUnits = localStorage.getItem("tempUnits") || "c";
  const tempC = tempUnits === "f" ? (temperature - 32) * (5 / 9) : temperature;
  const windMS = windUnit === "mph" ? windSpeed / 2.23694 : windSpeed;

  // Calculate the rating based on temperature, humidity, wind speed, and recent rain
  const rating = useMemo(() => {
    let score = 10;

    // Temperature score calculation
    if (tempC < 0) score -= 2;
    else if (tempC < 4) score -= 1;
    else if (tempC > 35) score -= 3;
    else if (tempC > 22) score -= 2;
    else if (tempC > 15) score -= 1;

    // Humidity score calculation
    if (humidity < 30) score -= 1.5;
    else if (humidity > 70 && humidity <= 90) score -= 4;
    else if (humidity > 90) score -= 5;

    // Wind score calculation
    if (windMS > 12) score -= 2;
    else if (windMS > 8) score -= 1;

    // Past Rain calculation
    if (recentRain?.rainedInLast6Hours) score -= 1;

    // If severe conditions are present, set score to 1
    const lowerCond = condition.toLowerCase();
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) return 1;

    // Current Precipitation score calculation
    if (lowerCond.includes("rain") || lowerCond.includes("drizzle")) score -= 1;

    return Math.max(1, Math.min(Math.round(score), 10));
  }, [tempC, humidity, windMS, recentRain, condition]);

  if (!weather || !weather.main || !weather.wind || !weather.weather) return null;

  const strokePercentage = (rating / 10) * 100;

  // Determine the stroke colour based on the rating
  const getStrokeColor = () => {
    if (rating >= 7) return "var(--circle-good-color)";
    if (rating >= 4) return "var(--circle-moderate-color)";
    return "var(--circle-severe-color)";
  };

  // Determine the priority label based on the conditions
  const getPriorityLabel = () => {
    const lower = condition.toLowerCase();
    if (lower.includes("storm") || lower.includes("thunder")) return "Storm risk – avoid running";
    if (humidity > 90) return "Extremely humid – difficult conditions";
    if (humidity > 70) return "Very humid – hydration needed";
    if (humidity < 30) return "Dry air – hydration needed";
    if (tempC < 0) return "Freezing temperatures – icy surfaces";
    if (tempC > 35) return "Extreme heat – avoid running";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Currently raining – caution while running";
    if (windMS > 12) return "Strong winds – risk of imbalance";
    if (recentRain?.rainedInLast6Hours) return "Recent rain – surfaces may be wet";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Current rain – low traction";
    if (lower.includes("fog")) return "Low visibility – run with caution";
    return "Conditions generally good";
  };

  // Determine the subtext based on the conditions
  const getSubtext = () => {
    const lower = condition.toLowerCase();
    if (lower.includes("storm") || lower.includes("thunder")) return "Severe weather – stay indoors.";
    if (lower.includes("snow")) return "Snow may cause slippery paths.";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Watch out for puddles and reduced grip.";
    if (recentRain?.rainedInLast6Hours) return `Rained ${recentRain.rainHoursCount} hour(s) ago – trails may still be wet.`;
    if (humidity > 90) return "Heavy air – you may tire faster.";
    if (tempC > 30) return "Hot conditions – slow pace, hydrate often.";
    if (windMS > 12) return "Strong winds can affect balance.";
    if (lower.includes("clear")) return "Ideal day for a run!";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Active rain – expect low traction and wet conditions.";
    return "Check live updates before heading out.";
  };

  // Render the component
  return (
    <div className="panel">
      <h2>Running Conditions</h2>
      <div className={styles.content}>
        <div className={styles.circleWrapper}>
          <svg className={styles.circleSvg} viewBox="0 0 36 36">
            <path className={styles.bg} d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
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
          <p className={styles.status}>{getPriorityLabel()}</p>
          <p className={styles.subtext}>{getSubtext()}</p>
        </div>
      </div>

      {/* Display additional information if in pro mode */}
      {localStorage.getItem("mode") === "pro" && (
        <>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Thermometer size={16} strokeWidth={1.5} />
              <p>Temperature</p>
            </div>
            <p>
              {tempUnits === "f" ? Math.round((tempC * 9) / 5 + 32) + "°F" : Math.round(tempC) + "°C"} –{" "}
              {tempC < 0
                ? "Freezing – caution on icy surfaces"
                : tempC > 35
                ? "Extremely hot – avoid if possible"
                : tempC > 22
                ? "Warm – may affect endurance"
                : tempC > 15
                ? "Mild heat – hydrate well"
                : "Ideal conditions"}
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Droplets size={16} strokeWidth={1.5} />
              <p>Humidity</p>
            </div>
            <p>
              {humidity}% –{" "}
              {humidity > 90
                ? "Extremely humid – may be exhausting"
                : humidity > 70
                ? "Very humid – harder to cool off"
                : humidity > 50
                ? "Moderate humidity"
                : humidity < 30
                ? "Too dry – can dehydrate quickly"
                : "Perfect running range"}
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Wind size={16} strokeWidth={1.5} />
              <p>Wind</p>
            </div>
            <p>
              {windUnit === "mph"
                ? (windMS * 2.23694).toFixed(1) + " mph"
                : windMS.toFixed(1) + " m/s"} –{" "}
              {windMS > 12
                ? "Strong wind – challenging"
                : windMS > 8
                ? "Moderate breeze – stay covered"
                : "Ideal breeze for cooling"}
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Droplet size={16} strokeWidth={1.5} />
              <p>Past Rainfall</p>
            </div>
            <p>
              {recentRain?.rainedInLast6Hours
                ? `Rained ${recentRain.rainHoursCount} hour(s) ago – paths may still be wet`
                : "No recent rainfall"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Rating;









