import React, { useMemo } from 'react';
import styles from './Clothing.module.css';
import { ReactComponent as WarmHat } from "../../assets/clothing-icons/warmhat.svg";
import { ReactComponent as Cap } from "../../assets/clothing-icons/cap.svg";
import { ReactComponent as Gloves } from "../../assets/clothing-icons/gloves.svg";
import { ReactComponent as LightJacket } from "../../assets/clothing-icons/lightjacket.svg";
import { ReactComponent as LongSleeve } from "../../assets/clothing-icons/longsleeve.svg";
import { ReactComponent as Mittens } from "../../assets/clothing-icons/mittens.svg";
import { ReactComponent as Shoes } from "../../assets/clothing-icons/shoes.svg";
import { ReactComponent as Shorts } from "../../assets/clothing-icons/shorts.svg";
import { ReactComponent as Thermals } from "../../assets/clothing-icons/thermals.svg";
import { ReactComponent as ThickTrousers } from "../../assets/clothing-icons/thicktrousers.svg";
import { ReactComponent as Trousers } from "../../assets/clothing-icons/trousers.svg";
import { ReactComponent as Vest } from "../../assets/clothing-icons/vest.svg";
import { ReactComponent as WarmJacket } from "../../assets/clothing-icons/warmjacket.svg";
import { ReactComponent as WarmShoes } from "../../assets/clothing-icons/warmshoes.svg";
import { ReactComponent as TShirt } from "../../assets/clothing-icons/tshirt.svg";

const Clothing = ({ weather }) => {
  const rawTemp = weather?.main?.temp || 0;
  const isProMode = localStorage.getItem('mode') === 'pro';

  const isRaining = weather?.weather?.some(condition => 
    condition.main.toLowerCase().includes('rain')
  ) || false;

  const temperature = useMemo(() => {
    const units = localStorage.getItem('tempUnits') || 'c';
    const convertedTemp = units === 'f' ? (rawTemp - 32) * 5/9 : rawTemp;
    return Math.round(convertedTemp * 2) / 2;
  }, [rawTemp]);

  const recommendations = useMemo(() => {
    let recs = [];
    
    if (temperature < 0) {
      recs.push(
        { 
          item: "Warm Hat", 
          icon: <WarmHat className={styles.icon} />,
          explanation: "Essential for preventing heat loss through the head (up to 30% of body heat)" 
        },
        { 
          item: "Thick Gloves", 
          icon: <Mittens className={styles.icon} />,
          explanation: "Protects against frostbite - mittens are warmer than gloves" 
        },
        { 
          item: "Thermal Base Layer", 
          icon: <Thermals className={styles.icon} />,
          explanation: "Wicks moisture and provides essential insulation close to skin" 
        },
        { 
          item: "Long Sleeve Shirt", 
          icon: <LongSleeve className={styles.icon} />,
          explanation: "Provides core insulation and protects arms from cold" 
        },
        { 
          item: "Heavy Jacket", 
          icon: <WarmJacket className={styles.icon} />,
          explanation: "Windproof and insulated to retain body heat in extreme cold" 
        },
        { 
          item: "Thick Trousers", 
          icon: <ThickTrousers className={styles.icon} />,
          explanation: "Insulated pants prevent heat loss from legs" 
        },
        { 
          item: "Warm Running Shoes", 
          icon: <WarmShoes className={styles.icon} />,
          explanation: "Thermal and waterproof to protect feet from cold surfaces" 
        }
      );
    } else if (temperature >= 0 && temperature < 5) {
      recs.push(
        { 
          item: "Hat", 
          icon: <Cap className={styles.icon} />,
          explanation: "Prevents significant heat loss from the head" 
        },
        { 
          item: "Gloves", 
          icon: <Gloves className={styles.icon} />,
          explanation: "Protects hands from cold wind and maintains dexterity" 
        },
        { 
          item: "Long Sleeve Shirt", 
          icon: <LongSleeve className={styles.icon} />,
          explanation: "Maintains core temperature in chilly conditions" 
        },
        { 
          item: "Jacket", 
          icon: <WarmJacket className={styles.icon} />,
          explanation: "Provides wind protection and insulation" 
        },
        { 
          item: "Trousers", 
          icon: <Trousers className={styles.icon} />,
          explanation: "Protects legs from wind chill" 
        },
        { 
          item: "Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: "Standard footwear with good grip for cold surfaces" 
        }
      );
    } else if (temperature >= 5 && temperature < 10) {
      recs.push(
        { 
          item: "T-Shirt", 
          icon: <TShirt className={styles.icon} />,
          explanation: "Breathable base layer for mild conditions" 
        },
        { 
          item: "Light Jacket", 
          icon: <LightJacket className={styles.icon} />,
          explanation: "Provides wind protection without overheating" 
        },
        { 
          item: "Trousers", 
          icon: <Trousers className={styles.icon} />,
          explanation: "Light leg covering for cooler temperatures" 
        },
        { 
          item: "Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: "Standard running footwear" 
        }
      );
    } else if (temperature >= 10 && temperature < 20) {
      recs.push(
        { 
          item: "T-Shirt", 
          icon: <TShirt className={styles.icon} />,
          explanation: "Light, breathable fabric for moderate temps" 
        },
        { 
          item: "Shorts", 
          icon: <Shorts className={styles.icon} />,
          explanation: "Allows for better airflow and cooling" 
        },
        { 
          item: "Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: "Standard running footwear" 
        }
      );
    } else if (temperature >= 20) {
      recs.push(
        { 
          item: "Vest", 
          icon: <Vest className={styles.icon} />,
          explanation: "Minimal coverage while protecting core from sun" 
        },
        { 
          item: "Shorts", 
          icon: <Shorts className={styles.icon} />,
          explanation: "Maximizes airflow and prevents overheating" 
        },
        { 
          item: "Light Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: "Breathable footwear to prevent sweaty feet" 
        }
      );
    }
    
    if (isRaining) {
      recs.push({ 
        item: "Raincoat", 
        icon: <LightJacket className={styles.icon} />,
        explanation: "Waterproof layer to keep you dry and maintain body temperature" 
      });
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
            <div className={styles.itemInfo}>
              <span>{rec.item}</span>
              {isProMode && (
                <p className={styles.explanation}>{rec.explanation}</p>
              )}
            </div>
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