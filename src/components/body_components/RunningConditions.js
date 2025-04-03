import { useMemo } from 'react';
import styles from './RunningConditions.module.css';
import {
  Thermometer,
  Droplet,
  Droplets,
  Wind
} from 'lucide-react';
import { toF, toMph } from "../../utils/UnitsConversions";

// This component calculates and displays a running conditions rating based on weather data.
function Rating({ weather, recentRain }) {
  const temperature = weather?.main?.temp ?? 0;
  const condition = weather?.weather?.[0]?.main ?? "Unknown";
  const humidity = weather?.main?.humidity ?? 50;
  const windSpeed = weather?.wind?.speed ?? 0;
  const windUnit = localStorage.getItem("speedUnits");
  const tempUnits = localStorage.getItem("tempUnits");
  const isNight = weather?.weather?.[0]?.icon?.includes("n");


  // Calculate the rating based on temperature, humidity, wind speed, and recent rain
  const rating = useMemo(() => {
    let score = 10;

    // Temperature score calculation
    if (temperature < 0) score -= isNight ? 3 : 2;
    else if (temperature < 4) score -= isNight ? 2 : 1;
    else if (temperature > 35) score -= 3;
    else if (temperature > 22) score -= 2;
    else if (temperature > 15) score -= 1;

    // Humidity score calculation
    if (humidity < 30) score -= 1.5;
    else if (humidity > 70 && humidity <= 90) score -= 4;
    else if (humidity > 90) score -= 5;

    // Wind score calculation
    if (windSpeed > 12) score -= 2;
    else if (windSpeed > 8) score -= 1;

    // Past Rain calculation
    if (recentRain?.rainedInLast6Hours) score -= 1;

    // If severe conditions are present, set score to 1
    const lowerCond = condition.toLowerCase();
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) return 1;

    // Current Precipitation score calculation
    if (lowerCond.includes("rain") || lowerCond.includes("drizzle")) score -= 1;

    return Math.max(1, Math.min(Math.round(score), 10));
  }, [temperature, humidity, windSpeed, recentRain, condition]);

  if (!weather || !weather.main || !weather.wind || !weather.weather) return null;

  const strokePercentage = (rating / 10) * 100;

  // Determine the stroke colour based on the rating
  const getStrokeColor = () => {
    if (rating >= 7) return styles.good;
    if (rating >= 4) return styles.moderate;
    return styles.severe;
  };

  // Determine the priority label based on the conditions
  const getPriorityLabel = () => {
    const lower = condition.toLowerCase();
    if (lower.includes("storm") || lower.includes("thunder")) return "Storm risk - avoid running";
    if (isNight && lower.includes("fog")) return "Night fog - very low visibility";
    if (isNight) return "Night time - wear reflectors";
    if (humidity > 90) return "Extremely humid - difficult conditions";
    if (humidity > 70) return "Very humid - hydration needed";
    if (humidity < 30) return "Dry air - hydration needed";
    if (temperature < 0) return "Freezing temperatures - icy surfaces";
    if (temperature > 35) return "Extreme heat - avoid running";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Currently raining - caution while running";
    if (windSpeed > 12) return "Strong winds - risk of imbalance";
    if (recentRain?.rainedInLast6Hours) return "Recent rain - surfaces may be wet";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Current rain - low traction";
    if (lower.includes("fog")) return "Low visibility - run with caution";
    return "Generally good";
  };

  // Determine the subtext based on the conditions
  const getSubtext = () => {
    const lower = condition.toLowerCase();
    if (lower.includes("storm") || lower.includes("thunder")) return "Severe weather - stay indoors.";
    if (isNight && lower.includes("fog")) return "Night fog reduces visibility even more.";
    if (isNight) return "Stay visible - wear reflective gear or lights.";
    if (lower.includes("snow")) return "Snow may cause slippery paths.";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Watch out for puddles and reduced grip.";
    if (recentRain?.rainedInLast6Hours) return `Rained ${recentRain.rainHoursCount} hour${recentRain.rainHoursCount === 1 ? "" : "s"} ago - trails may still be wet.`;
    if (humidity > 90) return "Heavy air - you may tire faster.";
    if (temperature > 30) return "Hot conditions - slow pace, hydrate often.";
    if (windSpeed > 12) return "Strong winds can affect balance.";
    if (lower.includes("clear")) return "Ideal day for a run!";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Active rain - expect low traction and wet conditions.";
    return "Check live updates before heading out.";
  };

  return (
    <div className="panel">
      <h2>Running Conditions</h2>
      <div className={styles.content}>
        <div className={styles.circleWrapper}>
        <svg className={styles.circleSvg} viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            className={styles.bg}
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="var(--circle-bg-color)"
            strokeWidth="4"
          />

          {/* Foreground progress circle */}
          <circle
            className={getStrokeColor()}
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 16}
            strokeDashoffset={(2 * Math.PI * 16) * (1 - rating / 10)}
            transform="rotate(-90 18 18)"
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
        <div className={styles.information}>
          <hr />
          <div className={styles.informationRow}>
            <Thermometer size={16} strokeWidth={1.5} />
            <p>
              {tempUnits === "f" ? Math.round(toF(temperature)) : Math.round(temperature)}° -{" "}
              {temperature < 0
                ? "Freezing - caution on icy surfaces"
                : temperature > 35
                ? "Extremely hot - avoid if possible"
                : temperature > 22
                ? "Warm - may affect endurance"
                : temperature > 15
                ? "Mild heat - hydrate well"
                : "Ideal conditions"}
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <Droplet size={16} strokeWidth={1.5} />
            <p>
              {humidity}% -{" "}
              {humidity > 90
                ? "Extremely humid - may be exhausting"
                : humidity > 70
                ? "Very humid - harder to cool off"
                : humidity > 50
                ? "Moderate humidity"
                : humidity < 30
                ? "Too dry - can dehydrate quickly"
                : "Perfect running range"}
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <Droplets size={16} strokeWidth={1.5} />
            <p>
              {recentRain?.rainedInLast6Hours
                ? `Rained ${recentRain.rainHoursCount} hour${recentRain.rainHoursCount === 1 ? "" : "s"} ago - paths may still be wet`
                : "No recent rainfall"}
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <Wind size={16} strokeWidth={1.5} />
            <p>
              {windUnit === "mph"
                ? Math.round(toMph(windSpeed) * 10) / 10 + " mph"
                : Math.round(windSpeed * 10) / 10 + " m/s"} -{" "}
              {windSpeed > 12
                ? "Strong wind - challenging"
                : windSpeed > 8
                ? "Moderate breeze - stay covered"
                : "Ideal breeze for cooling"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rating;









