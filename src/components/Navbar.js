import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import searchIcon from "../assets/search.svg";
import Setting from "./Setting";
import { Wind, Star, Zap, SunMoon, Sun, Moon, Menu } from "lucide-react";
import { updateTheme } from "../utils/Theme";

function Navbar() {
    const minDesktopWidth = 930;
    const maxMobileWidth = 465;
    const [desktopMenuActive, setDesktopMenuActive] = useState(window.innerWidth > minDesktopWidth);
    const [tabletMenuActive, setTabletMenuActive] = useState(window.innerWidth > maxMobileWidth && window.innerWidth <= minDesktopWidth);
    const [mobileMenuActive, setMobileMenuActive] = useState(window.innerWidth < maxMobileWidth);

    const [modeActive, setModeActive] = useState(false);
    const [unitsActive, setUnitsActive] = useState(false);
    const [themeActive, setThemeActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    const [mode, setMode] = useState(localStorage.getItem("mode"));
    const [tempUnits, setTempUnits] = useState(localStorage.getItem("tempUnits"));
    const [speedUnits, setSpeedUnits] = useState(localStorage.getItem("speedUnits"));
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const modeRef = useRef(null);
    const unitsRef = useRef(null);
    const themeRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            setDesktopMenuActive(window.innerWidth > minDesktopWidth);
            setTabletMenuActive(window.innerWidth > maxMobileWidth && window.innerWidth <= minDesktopWidth);
            setMobileMenuActive(window.innerWidth < maxMobileWidth);

            setModeActive(false);
            setUnitsActive(false);
            setThemeActive(false);
            setMenuActive(false);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (desktopMenuActive) {
                if (
                    modeRef.current && !modeRef.current.contains(event.target) &&
                    unitsRef.current && !unitsRef.current.contains(event.target) &&
                    themeRef.current && !themeRef.current.contains(event.target)
                ) {
                    setModeActive(false);
                    setUnitsActive(false);
                    setThemeActive(false);
                }
            } else {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setMenuActive(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [desktopMenuActive]);

    const handleModeClick = () => {
        setModeActive(prev => !prev);
        setUnitsActive(false);
        setThemeActive(false);
    }

    const handleUnitsClick = () => {
        setModeActive(false);
        setUnitsActive(prev => !prev);
        setThemeActive(false);
    }

    const handleThemeClick = () => {
        setModeActive(false);
        setUnitsActive(false);
        setThemeActive(prev => !prev);
    }

    const handeModeChange = (mode) => {
        setMode(mode);
        localStorage.setItem("mode", mode);
    }

    const handeTempUnitsChange = (units) => {
        setTempUnits(units);
        localStorage.setItem("tempUnits", units);
    }

    const handeSpeedUnitsChange = (units) => {
        setSpeedUnits(units);
        localStorage.setItem("speedUnits", units);
    }

    const handeThemeChange = (theme) => {
        setTheme(theme);
        localStorage.setItem("theme", theme);
        updateTheme();
    }

    const handleMenuClick = () => {
        setMenuActive(prev => !prev);
    }

    const modeOptions = () => {
        return (
            <>
                <button onClick={() => handeModeChange("basic")}>
                    <Star fill={mode === "basic" ? "#2C2C2C" : "none"} size={14} strokeWidth={2} />Basic Mode
                </button>
                <button onClick={() => handeModeChange("pro")}>
                    <Zap fill={mode === "pro" ? "#2C2C2C" : "none"} size={14} strokeWidth={1.75} />Pro Mode
                </button>
            </>
        );
    }

    const unitsOptions = () => {
        return (
            <>
                <div className={styles.unitsSection}>
                    <span className={styles.unitsSectionTitle}>Temperature</span>
                    <div className={styles.unitOptions}>
                        <button onClick={() => handeTempUnitsChange("celcius")}>
                        <span className={tempUnits === "celcius" ? styles.selected : ""}>C°</span>
                        </button>
                        <button onClick={() => handeTempUnitsChange("fahrenheit")}>
                            <span className={tempUnits === "fahrenheit" ? styles.selected : ""}>F°</span>
                        </button>
                    </div>
                </div>
                <hr className={styles.unitsSpliter}/>
                <div className={styles.unitsSection}>
                    <span className={styles.unitsSectionTitle}>Speed</span>
                    <div className={styles.unitOptions}>
                        <button onClick={() => handeSpeedUnitsChange("kilometers")}>
                        <span className={speedUnits === "kilometers" ? styles.selected : ""}>kmph</span>
                        </button>
                        <button onClick={() => handeSpeedUnitsChange("miles")}>
                            <span className={speedUnits === "miles" ? styles.selected : ""}>mph</span>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const themeOptions = () => {
        return (
            <>
                <button onClick={() => handeThemeChange("system")}>
                        <SunMoon fill={theme === "system" ? "#2C2C2C" : "none"} size={14} strokeWidth={2} />System Default
                </button>
                <button onClick={() => handeThemeChange("light")}>
                    <Sun fill={theme === "light" ? "#2C2C2C" : "none"} size={14} strokeWidth={2} />Light mode
                </button>
                <button onClick={() => handeThemeChange("dark")}>
                    <Moon fill={theme === "dark" ? "#2C2C2C" : "none"} size={14} strokeWidth={2} />Dark mode
                </button>
            </>
        );
    }
     
    // Needs to be implemented
    const handleSearch = () => {};

    return (
        <div className={styles.navbar}>
            {!desktopMenuActive && (
                <div className={styles.menu}  ref={menuRef}>
                    <button>
                        <Menu size={24} onClick={() => handleMenuClick()} />
                    </button>
                    {menuActive && (
                        <div className={styles.dropdownMenu}>
                            <span className={styles.menuTitle}>Mode</span>
                            {modeOptions()}
                            <hr />
                            <span className={styles.menuTitle}>Units</span>
                            {unitsOptions()}
                            <hr />
                            <span className={styles.menuTitle}>Theme</span>
                            {themeOptions()}
                        </div>
                    )}
                </div>
            )}
            {!mobileMenuActive && (
                <div className={styles.logo}>
                    <h2>RunCast</h2>
                    <Wind size={42} strokeWidth={1.7} />
                </div>
            )}
            <div className={styles.search}>
                <input type="text" placeholder="Search location" />
                <button onClick={handleSearch}><img src={searchIcon} alt="" /></button>                
            </div>
            {desktopMenuActive && (
            <div className={styles.settings}>
                <Setting title="Mode" handleClick={handleModeClick} isActive={modeActive} ref={modeRef}>
                    {modeOptions()}
                </Setting>
                <Setting title="Units" handleClick={handleUnitsClick} isActive={unitsActive} ref={unitsRef}>
                    {unitsOptions()}
                </Setting>
                <Setting title="Theme" handleClick={handleThemeClick} isActive={themeActive} ref={themeRef}>
                    {themeOptions()}
                </Setting>
            </div>
            )}
        </div>
    );
}

export default Navbar;
