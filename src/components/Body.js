import Header from "./bodyComponents/Header";

function Body({ weather }) {
    return (
        <>
            <Header weather={weather} />
        </>
    );
}

export default Body;
