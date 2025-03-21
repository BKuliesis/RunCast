import Header from "./bodyComponents/Header";
import Panels from "./bodyComponents/Panels";

function Body({ weather }) {
    return (
        <>
            <Header weather={weather} />
            <Panels weather={weather} />
        </>
    );
}

export default Body;
