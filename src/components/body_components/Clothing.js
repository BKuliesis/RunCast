import React, { useMemo } from 'react';
import styles from './Clothing.module.css';
import {
   FaTshirt,
   FaHatCowboySide,
   FaVest,
} from 'react-icons/fa';
import { 
  LiaHatCowboySideSolid,
  LiaMittenSolid,

 } from "react-icons/lia";
 import { GiClothes,
  GiShirt,
  GiMonclerJacket,
  GiArmoredPants,
  GiFurBoot,
  GiGloves,
  GiRunningShoe,
  GiSleevelessJacket,
  GiShorts,
  GiSleevelessTop,
  } from "react-icons/gi";
  import { PiPants } from "react-icons/pi";
  import { IoShirtOutline } from "react-icons/io5";


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

  console.log("Temperature: " + temperature);
  console.log("RawTemp: " + rawTemp);
  console.log("Units: " + localStorage.getItem('tempUnits'));

  // Memoize recommendations to prevent flickering
  const recommendations = useMemo(() => {
    let recs = [];
    
    if (temperature < 0) {
      recs.push(
        { item: "Warm Hat", icon: <LiaHatCowboySideSolid /> },
        { item: "Thick Gloves", icon: <LiaMittenSolid  /> },
        { item: "Thermal Base Layer", icon: <GiClothes /> },
        { item: "Long Sleeve Shirt", icon: <GiShirt /> },
        { item: "Heavy Jacket", icon: <GiMonclerJacket /> },
        { item: "Thick Trousers", icon: <GiArmoredPants /> },
        { item: "Warm Running Shoes", icon: <GiFurBoot  /> }
      );
    } else if (temperature >= 0 && temperature < 5) {
      recs.push(
        { item: "Hat", icon: <LiaHatCowboySideSolid /> },
        { item: "Gloves", icon: <GiGloves  /> },
        { item: "Long Sleeve Shirt", icon: <GiShirt /> },
        { item: "Jacket", icon: <GiMonclerJacket /> },
        { item: "Trousers", icon: <PiPants /> },
        { item: "Running Shoes", icon: <GiRunningShoe  /> }
      );
    } else if (temperature >= 5 && temperature < 10) {
      recs.push(
        { item: "T-Shirt", icon: <IoShirtOutline /> },
        { item: "Light Jacket", icon: <GiSleevelessJacket  /> },
        { item: "Trousers", icon: <PiPants /> },
        { item: "Running Shoes", icon: <GiRunningShoe /> }
      );
    } else if (temperature >= 10 && temperature < 20) {
      recs.push(
        { item: "T-Shirt", icon: <IoShirtOutline /> },
        { item: "Shorts", icon: <GiShorts  /> },
        { item: "Running Shoes", icon: <GiRunningShoe /> }
      );
    } else if (temperature >= 20) {
      recs.push(
        { item: "Vest", icon: <FaVest  /> },
        { item: "Shorts", icon: <GiShorts /> },
        { item: "Light Running Shoes", icon: <GiRunningShoe /> }
      );
    }
    
    if (isRaining) {
      recs.push({ item: "Raincoat", icon: <FaTshirt /> });
    }
    
    return recs;
  }, [temperature, isRaining]);

  return (
    <div className={styles.recommendation}>
      <h2 className={styles.title}>Recommended Clothing</h2>
      <ul className={styles.list}>
        {recommendations.map((rec, index) => (
          <li key={index} className={styles.listItem}>
            <span className={styles.icon}>{rec.icon}</span>
            <span>{rec.item}</span>
            {rec.item.includes('(optional)') && (
              <span className={styles.optionalTag}>Optional</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clothing;