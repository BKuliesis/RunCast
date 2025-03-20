import React from 'react';
import styles from './Clothing.module.css';

const Clothing = ({ temperature, isRaining }) => {
    const getClothingRecommendation = () => {
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