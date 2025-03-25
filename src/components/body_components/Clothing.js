import React, { useEffect, useMemo } from 'react';
import styles from './Clothing.module.css';

const Clothing = ({ weather }) => {
  // Get raw temperature (from API, could be °C or °F)
  const rawTemp = weather?.main?.temp || 0;

  // Rain check
  const isRaining = weather?.weather?.some(condition => 
      condition.main.toLowerCase().includes('rain')
  ) || false;

  // Convert temperature based on localStorage (no React state)
  const temperature = useMemo(() => {
    const units = localStorage.getItem('tempUnits') || 'c';
    const convertedTemp = units === 'f' ? (rawTemp - 32) * 5/9 : rawTemp;
    
    // Round to nearest 0.5
    return Math.round(convertedTemp * 2) / 2;
  }, [rawTemp]);

  console.log("Temperatue: " + temperature)
  console.log("RawTemp: " + rawTemp)
  console.log("Units: " + localStorage.getItem('tempUnits'))
  // Memoize recommendations to prevent flickering
  const recommendations = useMemo(() => {
    let recs = [];
    
    if (temperature < 0) {
      recs.push(
        { item: "Warm Hat", icon: "🧢" },
        { item: "Thick Gloves", icon: "🧤" },
        { item: "Thermal Base Layer", icon: "🥼" },
        { item: "Long Sleeve Shirt", icon: "👕" },
        { item: "Heavy Jacket", icon: "🧥" },
        { item: "Thick Trousers", icon: "👖" },
        { item: "Warm Running Shoes", icon: "👟" }
      );
    } else if (temperature >= 0 && temperature < 5) {
      recs.push(
        { item: "Hat", icon: "🧢" },
        { item: "Gloves", icon: "🧤" },
        { item: "Long Sleeve Shirt", icon: "👕" },
        { item: "Jacket", icon: "🧥" },
        { item: "Trousers", icon: "👖" },
        { item: "Running Shoes", icon: "👟" }
      );
    } else if (temperature >= 5 && temperature < 10) {
      recs.push(
        { item: "T-Shirt", icon: "👕" },
        { item: "Light Jacket", icon: "🧥" },
        { item: "Trousers", icon: "👖" },
        { item: "Running Shoes", icon: "👟" }
      );
    } else if (temperature >= 10 && temperature < 20) {
      recs.push(
        { item: "T-Shirt", icon: "👕" },
        { item: "Shorts", icon: "🩳" },
        { item: "Running Shoes", icon: "👟" }
      );
    } else if (temperature >= 20) {
      recs.push(
        { item: "Vest", icon: "🦺" },
        { item: "Shorts", icon: "🩳" },
        { item: "Light Running Shoes", icon: "👟" }
      );
    }
    
    if (isRaining) {
      recs.push({ item: "Raincoat", icon: "🌧️" });
    }
    
    return recs;
  }, [temperature, isRaining]);

  return (
    <div className={styles.recommendation}>
      <h2 className={styles.title}>Recommended Clothing</h2>
      <table className={styles.table}>
        <tbody>
          {recommendations.map((rec, index) => (
            <tr key={index}>
              <td>{rec.icon}</td>
              <td>{rec.item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clothing;