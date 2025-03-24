import React, { useState, useEffect } from 'react'
import styles from './Clothing.module.css';


const Clothing = ({ weather }) => {
  const [tempUnits, setTempUnits] = useState(localStorage.getItem('tempUnits') || 'celcius');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the raw temperature value
  const rawTemp = weather?.main?.temp || 0;
  
  // Convert to Celsius if needed
  const temperature = tempUnits === 'fahrenheit'
      ? Math.round((rawTemp - 32) * 5/9)
      : rawTemp;

  // Rain check
  const isRaining = weather?.weather?.some(condition => 
      condition.main.toLowerCase().includes('rain')
  ) || false;

  // Listen for localStorage changes
  useEffect(() => {
      const handleStorageChange = () => {
          setIsLoading(true);
          const newUnits = localStorage.getItem('tempUnits') || 'celcius';
          setTempUnits(newUnits);
          setTimeout(() => setIsLoading(false), 100); // Brief loading state
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getClothingRecommendation = () => {
      if (isLoading) return [{ item: "Updating...", icon: "⏳" }];
      
      let recommendations = [];
      
        if (temperature < 0) {
          recommendations.push(
            { item: "Warm Hat", icon: "🧢" },
            { item: "Thick Gloves", icon: "🧤" },
            { item: "Thermal Base Layer", icon: "🥼" },
            { item: "Long Sleeve Shirt", icon: "👕" },
            { item: "Heavy Jacket", icon: "🧥" },
            { item: "Thick Trousers", icon: "👖" },
            { item: "Warm Running Shoes", icon: "👟" }
          );
        } else if (temperature >= 0 && temperature < 5) {
          recommendations.push(
            { item: "Hat", icon: "🧢" },
            { item: "Gloves", icon: "🧤" },
            { item: "Long Sleeve Shirt", icon: "👕" },
            { item: "Jacket", icon: "🧥" },
            { item: "Trousers", icon: "👖" },
            { item: "Running Shoes", icon: "👟" }
          );
        } else if (temperature >= 5 && temperature < 10) {
          recommendations.push(
            { item: "T-Shirt", icon: "👕" },
            { item: "Light Jacket", icon: "🧥" },
            { item: "Trousers", icon: "👖" },
            { item: "Running Shoes", icon: "👟" }
          );
        } else if (temperature >= 10 && temperature < 20) {
          recommendations.push(
            { item: "T-Shirt", icon: "👕" },
            { item: "Shorts", icon: "🩳" },
            { item: "Running Shoes", icon: "👟" }
          );
        } else if (temperature >= 20) {
          recommendations.push(
            { item: "Vest", icon: "🦺" },
            { item: "Shorts", icon: "🩳" },
            { item: "Light Running Shoes", icon: "👟" }
          );
        }
      
        if (isRaining) {
          recommendations.push({ item: "Raincoat", icon: "🌧️" });
        }
      
        return recommendations;
      };

  return (
    <div className={styles.recommendation}>
      <h2 className={styles.title}>Recommended Clothing</h2>
      <table className={styles.table}>

        <tbody>
          {getClothingRecommendation().map((rec, index) => (
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