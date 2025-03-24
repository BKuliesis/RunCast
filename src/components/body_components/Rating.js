import React from "react";
import "./Rating.css";

const WeatherApp = ({ temperature, condition, lastRain }) => {
  // Function to calculate weather severity rating
  const calculateWeatherRating = (temp, cond) => {
    let rating = 3; // Default moderate rating

    if (temp < -10) rating = 9;
    else if (temp >= -10 && temp < 0) rating = 7;
    else if (temp >= 0 && temp < 10) rating = 5;
    else if (temp >= 10 && temp < 25) rating = 3;
    else if (temp >= 25 && temp < 35) rating = 6;
    else if (temp >= 35) rating = 9;

    if (temperature === null || condition === "") {
      return <p>Loading weather data...</p>;
    }
    

    // Adjust rating based on weather condition
    const lowerCond = cond ? cond.toLowerCase() : "";
    if (lowerCond.includes("storm") || lowerCond.includes("tornado")) rating = 10;
    else if (lowerCond.includes("snow")) rating += 2;
    else if (lowerCond.includes("rain")) rating += 1;
    else if (lowerCond.includes("fog")) rating += 1;
    else if (lowerCond.includes("clear")) rating -= 1;

    return Math.max(1, Math.min(rating, 10)); // Ensure within 1-10
  };

  const rating = calculateWeatherRating(temperature, condition);

  // Determine stroke color based on severity rating
  const getStrokeColor = (rating) => {
    if (rating <= 3) return "#006400"; // Dark Green
    if (rating === 4) return "#FFD700"; // Yellow
    if (rating === 5) return "#FFA500"; // Light Orange
    if (rating >= 6 && rating <= 7) return "#FF8C00"; // Orange
    if (rating === 8) return "#FF4500"; // Light Red
    if (rating >= 9) return "#B22222"; // Dark Red
    return "#006400"; // Default
  };

  // Define stroke completion percentage (scales up gradually)
  const strokePercentage = (rating / 10) * 100;

  return (
    <div className="weather-container">
      <h4 className="weather-title">Running Conditions</h4>
      <div className="weather-content">
        <div className="circle-container">
          <div className="progress-circle">
            <svg viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              />
              <path
                className="circle-progress"
                d="M18 2a16 16 0 1 1 0 32"
                style={{
                  stroke: getStrokeColor(rating),
                  strokeDasharray: `${strokePercentage}, 100`,
                }}
              />
            </svg>
            <span className="rating-number">{rating}</span>
          </div>
        </div>
        <div className="weather-text">
          <p className="weather-status">
            {rating <= 4 ? "Moderately Wet" : "Severe Conditions"}
          </p>
          <p className="weather-subtext">
            {lastRain
              ? `Rained ${lastRain} hours ago, expect wet paths.`
              : "Check for weather updates."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
