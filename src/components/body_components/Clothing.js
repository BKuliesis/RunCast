import React, { useMemo } from 'react';
import styles from './Clothing.module.css';
import { ReactComponent as WarmHat } from "../../assets/warmhat.svg";
import { ReactComponent as Cap } from "../../assets/cap.svg";
import { ReactComponent as Gloves } from "../../assets/gloves.svg";
import { ReactComponent as LightJacket } from "../../assets/lightjacket.svg";
import { ReactComponent as LongSleeve } from "../../assets/longsleeve.svg";
import { ReactComponent as Mittens } from "../../assets/mittens.svg";
import { ReactComponent as Shoes } from "../../assets/shoes.svg";
import { ReactComponent as Shorts } from "../../assets/shorts.svg";
import { ReactComponent as Thermals } from "../../assets/thermals.svg";
import { ReactComponent as ThickTrousers } from "../../assets/thicktrousers.svg";
import { ReactComponent as Trousers } from "../../assets/trousers.svg";
import { ReactComponent as Vest } from "../../assets/vest.svg";
import { ReactComponent as WarmJacket } from "../../assets/warmjacket.svg";
import { ReactComponent as WarmShoes } from "../../assets/warmshoes.svg";
import { ReactComponent as TShirt } from "../../assets/tshirt.svg";


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

  // Memoize recommendations to prevent flickering
  const recommendations = useMemo(() => {
    let recs = [];
    
    if (temperature < 0) {
      recs.push(
        { item: "Warm Hat", icon: <WarmHat className={styles.icon} /> },
        { item: "Thick Gloves", icon: <Mittens className={styles.icon} /> },
        { item: "Thermal Base Layer", icon: <Thermals className={styles.icon} /> },
        { item: "Long Sleeve Shirt", icon: <LongSleeve className={styles.icon} /> },
        { item: "Heavy Jacket", icon: <WarmJacket className={styles.icon} /> },
        { item: "Thick Trousers", icon: <ThickTrousers className={styles.icon} /> },
        { item: "Warm Running Shoes", icon: <WarmShoes className={styles.icon} /> }
      );
    } else if (temperature >= 0 && temperature < 5) {
      recs.push(
        { item: "Hat", icon: <Cap className={styles.icon} /> },
        { item: "Gloves", icon: <Gloves className={styles.icon} /> },
        { item: "Long Sleeve Shirt", icon: <LongSleeve className={styles.icon} /> },
        { item: "Jacket", icon: <WarmJacket className={styles.icon} /> },
        { item: "Trousers", icon: <Trousers className={styles.icon} /> },
        { item: "Running Shoes", icon: <Shoes className={styles.icon} /> }
      );
    } else if (temperature >= 5 && temperature < 10) {
      recs.push(
        { item: "T-Shirt", icon: <TShirt className={styles.icon} /> },
        { item: "Light Jacket", icon: <LightJacket className={styles.icon} /> },
        { item: "Trousers", icon: <Trousers className={styles.icon} /> },
        { item: "Running Shoes", icon: <Shoes className={styles.icon} /> }
      );
    } else if (temperature >= 10 && temperature < 20) {
      recs.push(
        { item: "T-Shirt", icon: <TShirt className={styles.icon} /> },
        { item: "Shorts", icon: <Shorts className={styles.icon} /> },
        { item: "Running Shoes", icon: <Shoes className={styles.icon} /> }
      );
    } else if (temperature >= 20) {
      recs.push(
        { item: "Vest", icon: <Vest className={styles.icon} /> },
        { item: "Shorts", icon: <Shorts className={styles.icon} /> },
        { item: "Light Running Shoes", icon: <Shoes className={styles.icon} /> }
      );
    }
    
    if (isRaining) {
      recs.push({ item: "Raincoat", icon: <LightJacket className={styles.icon} /> });
    }
    
    return recs;
  }, [temperature, isRaining]);

  return (
    <div className="panel" style={{height: "fit-content"}}>
      <h2>Recommended Clothing</h2>
      <ul className={styles.list}>
        {recommendations.map((rec, index) => (
          <li key={index} className={styles.listItem}>
            {rec.icon}
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