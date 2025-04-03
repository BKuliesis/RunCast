import React, { useMemo } from 'react';
import styles from './Clothing.module.css';
// Import all svg files for icons
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
import { TriangleAlert } from "lucide-react";

const Clothing = ({ weather, recentRain }) => {
  //Get current temperature
  const temperature = weather?.main?.temp;
  //Get current mode
  const isProMode = localStorage.getItem('mode') === 'pro';

  //Check if it is raining
  const isRaining = weather?.weather?.some(condition => 
    condition.main.toLowerCase().includes('rain')
  ) || false;

  //Check if it is raining, or has rained recently, to see if high grip shoes are needed
  const needsTraction = isRaining || recentRain?.rainedInLast6Hours;

  // Check if it's nighttime 
  const isNightTime = useMemo(() => {
    if (!weather?.weather?.[0]?.icon) return false;
    return weather.weather[0].icon.includes("n"); //'n' in icon indicates night
  }, [weather]);

  //Generate the clothing recommendations for current weather conditions
  const recommendations = useMemo(() => {
    let recs = [];
    //Recommend a cap to keep rain out of face, if it is raining
    if (isNightTime){
      recs.push({
        item: "Reflective Gear", 
        icon: <TriangleAlert className={styles.icon} strokeWidth={1.25} />,
        explanation: "Increases visibility to drivers in low-light conditions"
      })
    }
    if (isRaining && temperature >= 5) {
      recs.push({ 
        item: temperature >= 20 ? "Running Visor" : "Running Cap",
        icon: <Cap className={styles.icon} />,
        explanation: temperature >= 20 
          ? "Keeps rain out of your eyes while allowing heat to escape" 
          : "Protects your face from rain and helps maintain visibility"
      });
      }
    //For extreme cold
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
          item: "Winter Running Shoes", 
          icon: <WarmShoes className={styles.icon} />,
          explanation: "Thermal and waterproof to protect feet from cold surfaces and provide high grip" 
        }
      );
      //For relatively cold weather
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
        { //Recommend different shoes based on surface conditions
          item: needsTraction ? "High-Grip Running Shoes" : "Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: needsTraction 
            ? "Extra grip for wet or slippery conditions" 
            : "Standard footwear with good grip for cold surfaces" 
        }
      );
      //For slightly cold conditions
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
          item: needsTraction ? "High-Grip Running Shoes" : "Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: needsTraction 
            ? "Extra grip for wet or slippery conditions" 
            : "Standard running footwear" 
        }
      );
      //For relatively warm conditions 
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
          item: needsTraction ? "High-Grip Running Shoes" : "Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: needsTraction 
            ? "Extra grip for wet or slippery conditions" 
            : "Standard running footwear" 
        }
      );
      //For high-heat conditions
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
          item: needsTraction ? "High-Grip Running Shoes" : "Light Running Shoes", 
          icon: <Shoes className={styles.icon} />,
          explanation: needsTraction 
            ? "Prevents slipping on wet surfaces in warm conditions" 
            : "Breathable footwear to prevent overheating feet" 
        }
      );
    }
    

    
    return recs;
  }, [temperature, isRaining, needsTraction]);

  //Display recommendations
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clothing;