import { useMemo } from 'react';
import styles from './Rating.module.css';
import {
  Thermometer,
  Droplet,
  Droplets,
  Wind,
  Cloud
} from 'lucide-react';

function Rating({ weather, recentRain }) {
  const temperature = weather?.main?.temp ?? 0;
  const condition = weather?.weather?.[0]?.main ?? "Unknown";
  const humidity = weather?.main?.humidity ?? 50;
  const windSpeed = weather?.wind?.speed ?? 0;
  const windUnit = weather?.wind?.unit ?? "m/s";
  const tempUnits = localStorage.getItem("tempUnits") || "c";
  const tempC = tempUnits === "f" ? (temperature - 32) * (5 / 9) : temperature;
  const windMS = windUnit === "mph" ? windSpeed / 2.23694 : windSpeed;

  const rating = useMemo(() => {
    let baseRating;

    if (tempC < -10) baseRating = 9;
    else if (tempC < 0) baseRating = 7;
    else if (tempC < 10) baseRating = 5;
    else if (tempC < 25) baseRating = 3;
    else if (tempC < 35) baseRating = 6;
    else baseRating = 9;

    const lowerCond = condition.toLowerCase();
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) return 1;
    if (lowerCond.includes("snow")) baseRating += 2;
    else if (lowerCond.includes("rain") || lowerCond.includes("drizzle")) baseRating += 1;
    else if (lowerCond.includes("fog")) baseRating += 1;
    else if (lowerCond.includes("clear")) baseRating -= 1;

    let modifier = 0;
    if (recentRain?.rainedInLast6Hours) modifier += 1;
    if (windMS > 12) modifier += 1;
    else if (windMS > 8) modifier += 0.5;
    if (humidity < 30 || humidity > 80) modifier += 0.5;

    baseRating += Math.min(modifier, 2);

    return 11 - Math.max(1, Math.min(Math.round(baseRating), 10));
  }, [tempC, condition, humidity, windMS, recentRain]);

  if (!weather || !weather.main || !weather.wind || !weather.weather) return null;

  const strokePercentage = (rating / 10) * 100;

  const getStrokeColor = () => {
    if (rating >= 8) return "var(--circle-good-color)";
    if (rating >= 5) return "var(--circle-moderate-color)";
    return "var(--circle-severe-color)";
  };

  const getStatusLabel = (temp, humidity, wind, condition) => {
    const lower = condition.toLowerCase();
    let reasons = [];

    if (lower.includes("storm") || lower.includes("thunder")) return "Storm risk – avoid running";

    if (lower.includes("snow")) reasons.push("Snowy conditions");
    if (lower.includes("rain") || lower.includes("drizzle")) reasons.push("Wet and slippery");
    if (recentRain?.rainedInLast6Hours) reasons.push("Recent rainfall");

    if (lower.includes("fog")) reasons.push("Low visibility");
    if (temp < 0) reasons.push("Freezing temperatures");
    else if (temp >= 30) reasons.push("High heat – hydrate well");

    if (humidity > 90) reasons.push("Extremely humid");
    else if (humidity > 70) reasons.push("Humid air");
    else if (humidity < 20) reasons.push("Dry air");

    if (wind > 12) reasons.push("Strong winds");
    else if (wind > 8) reasons.push("Windy conditions");

    if (reasons.length === 0 && lower.includes("clear")) return "Ideal conditions";

    return reasons.join(" · ");
  };

  const getSubtext = (temp, humidity, wind, condition, rainData) => {
    const lower = condition.toLowerCase();

    if (lower.includes("storm") || lower.includes("thunder")) {
      return "Avoid outdoor activity until conditions improve.";
    }

    if (lower.includes("snow")) {
      return "Icy surfaces possible – run with caution.";
    }

    if (lower.includes("rain") || lower.includes("drizzle")) {
      return "Wet ground and puddles may affect traction.";
    }

    if (rainData?.rainedInLast6Hours) {
      return `It rained ${rainData.rainHoursCount} hour(s) ago – surfaces may still be wet or muddy.`;
    }

    if (lower.includes("fog")) return "Wear reflective gear for safety.";
    if (humidity > 90) return "Air is heavy – overheating risk. Hydrate often.";
    if (temp >= 30) return "Hot conditions – take it easy and stay hydrated.";
    if (wind > 12) return "Strong gusts may affect your pace and balance.";

    if (lower.includes("clear")) return "Ideal weather – go enjoy your run!";

    return "Conditions mixed – use your best judgment.";
  };

  return (
    <div className="panel">
      <h2>Running Conditions</h2>
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
          <p className={styles.status}>
            {getStatusLabel(tempC, humidity, windMS, condition)}
          </p>
          <p className={styles.subtext}>
            {getSubtext(tempC, humidity, windMS, condition, recentRain)}
          </p>
        </div>
      </div>

      {localStorage.getItem("mode") === "pro" && (
        <>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Thermometer size={16} strokeWidth={1.5} />
              <p>Temperature</p>
            </div>
            <p>
              {tempC}°C – {
                tempC < 0
                  ? "Freezing conditions – risk of icy surfaces"
                  : tempC >= 30
                    ? "High heat – hydrate well and slow your pace"
                    : "Comfortable for most runners"
              }
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Wind size={16} strokeWidth={1.5} />
              <p>Wind</p>
            </div>
            <p>
              {windMS.toFixed(1)} m/s – {
                windMS > 12
                  ? "Strong winds may affect balance and pace"
                  : windMS > 8
                    ? "Noticeable breeze – adjust clothing"
                    : "Calm wind – ideal"
              }
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Droplets size={16} strokeWidth={1.5} />
              <p>Humidity</p>
            </div>
            <p>
              {humidity}% – {
                humidity > 90
                  ? "Extremely humid – risk of overheating"
                  : humidity > 70
                    ? "High humidity – runs may feel harder"
                    : humidity < 30
                      ? "Dry air – stay hydrated"
                      : "Optimal for running"
              }
            </p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Cloud size={16} strokeWidth={1.5} />
              <p>Current Condition</p>
            </div>
            <p>{condition}</p>
          </div>
          <hr />
          <div className={styles.informationRow}>
            <div className={styles.labelGroup}>
              <Droplet size={16} strokeWidth={1.5} />
              <p>Past Rainfall</p>
            </div>
            <p>
              {recentRain?.rainedInLast6Hours
                ? `Rained ${recentRain.rainHoursCount} hour(s) ago – paths may still be wet or muddy`
                : "No rain in the past 6 hours"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Rating;





