import React from 'react';
import Clothing from './Clothing';

function Body() {

    //Temporary test before api working
    const weatherData = {
        temperature: -10,
        isRaining: true,
    };
    return (
        <>
        <Clothing temperature = {weatherData.temperature} isRaining = {weatherData.isRaining} />
        </>
    );
}

export default Body;
