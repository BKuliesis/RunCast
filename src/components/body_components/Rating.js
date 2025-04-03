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
    let baseRating = 3;

    // 🌡️ Temperature logic (in Celsius)
    if (tempC < 0) baseRating = 7;
    else if (tempC < 4) baseRating = 5;
    else if (tempC <= 15) baseRating = 2;
    else if (tempC <= 22) baseRating = 4;
    else if (tempC <= 35) baseRating = 6;
    else baseRating = 9;

    const lowerCond = condition.toLowerCase();
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) return 1;
    if (lowerCond.includes("snow")) baseRating += 2;
    else if (lowerCond.includes("rain") || lowerCond.includes("drizzle")) baseRating += 1;
    else if (lowerCond.includes("fog")) baseRating += 1;

    let modifier = 0;
    if (recentRain?.rainedInLast6Hours) modifier += 1;
    if (windMS > 12) modifier += 1;
    else if (windMS > 8) modifier += 0.5;
    if (humidity > 70 || humidity < 30) modifier += 1;

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

  const getPriorityLabel = () => {
    const lower = condition.toLowerCase();

    if (lower.includes("storm") || lower.includes("tornado") || lower.includes("thunder")) {
      return "Storm risk – avoid running";
    }

    if (humidity > 70) return "Extremely humid – hard to breathe";
    if (humidity > 50) return "High humidity – may affect comfort";
    if (humidity < 30) return "Too dry – stay hydrated";

    if (tempC < 0) return "Freezing – risk of icy paths";
    if (tempC > 35) return "Too hot – not safe to run";
    if (recentRain?.rainedInLast6Hours) return `Rain ${recentRain.rainHoursCount}h ago – wet surfaces`;
    if (windMS > 12) return "Strong winds – challenging pace";

    if (lower.includes("snow")) return "Snowy terrain – watch footing";
    if (lower.includes("rain") || lower.includes("drizzle")) return "Wet and slippery";

    return "Ideal conditions";
  };

  const getSubtext = () => {
    const lower = condition.toLowerCase();

    if (lower.includes("storm") || lower.includes("tornado")) {
      return "Postpone your run until the storm clears.";
    }

    if (lower.includes("snow")) {
      return "Snow and ice may impact safety.";
    }

    if (recentRain?.rainedInLast6Hours) {
      return `Rain occurred ${recentRain.rainHoursCount}h ago – watch for puddles.`;
    }

    if (humidity > 70) return "Hydrate well and monitor fatigue.";
    if (tempC > 35) return "Avoid long runs in this heat.";
    if (windMS > 12) return "Gusts may impact your pace.";

    if (lower.includes("clear")) return "Excellent weather – enjoy your run!";
    return "Mixed conditions – stay aware.";
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
          <p className={styles.status}>{getPriorityLabel()}</p>
          <p className={styles.subtext}>{getSubtext()}</p>
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
              {
                tempUnits === "f"
                  ? Math.round((tempC * 9) / 5 + 32) + "°F"
                  : Math.round(tempC) + "°C"
              } – {
                tempC < 0
                  ? "Freezing – icy paths likely"
                  : tempC <= 15
                    ? "Ideal for running"
                    : tempC <= 22
                      ? "Mild heat – may feel slower"
                      : tempC <= 35
                        ? "High heat – hydrate often"
                        : "Too hot – not advised"
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
              {
                windUnit === "mph"
                  ? (windMS * 2.23694).toFixed(1) + " mph"
                  : windMS.toFixed(1) + " m/s"
              } – {
                windMS > 12
                  ? "Strong winds – challenging pace"
                  : windMS > 8
                    ? "Breezy – may impact form"
                    : "Calm – perfect running conditions"
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
              {humidity + "% – "} {
                humidity > 70
                  ? "Extremely humid – hard to breathe"
                  : humidity > 50
                    ? "High humidity – discomfort possible"
                    : humidity < 30
                      ? "Too dry – hydrate often"
                      : "Perfect humidity for running"
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
              {
                recentRain?.rainedInLast6Hours
                  ? `Rained ${recentRain.rainHoursCount}h ago – may be muddy`
                  : "Dry – no recent rain"
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Rating;








