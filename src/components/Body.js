import Header from "./body_components/Header";

function Body({ weather }) {
    return (
        <>
            <Header weather={weather} />
        </>
    );
}

export default Body;
