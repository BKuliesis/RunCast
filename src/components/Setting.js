import { useEffect, useRef } from "react";
import chevron from "../assets/chevron.svg";
import styles from "./Navbar.module.css";

function Setting(props) {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                props.handleClick();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }
    , []);

    return (
        <div className={styles.setting} ref={props.ref}>
            <button onClick={props.handleClick}>
                <span>{props.title}</span>
                <img src={chevron} alt="" className={props.isActive ? styles.rotated : ""} />
            </button>
            {props.isActive && (
                <div className={styles.dropdownMenu}>
                    {props.children}
                </div>
            )}
        </div>
    );
}

export default Setting;