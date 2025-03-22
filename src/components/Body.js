import styles from "./Body.module.css";
import Header from "./body_components/Header";

function Body({ weather }) {
    return (
        <div className={styles.body}>
            <Header weather={weather} />
        </div>
    );
}

export default Body;
