import Header from "./body_components/Header";
import Panels from "./body_components/Panels";

function Body({ weather }) {
    return (
        <>
            <Header weather={weather} />
            <Panels weather={weather} />
        </>
    );
}

export default Body;
