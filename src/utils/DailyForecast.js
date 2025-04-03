// Extracts daily forecast data from the OpenWeather API response
export const processDailyForecast = (forecast) => {
    const dailyData = forecast.list.reduce((acc, entry) => {
        const date = new Date(entry.dt * 1000).toISOString().split("T")[0]; // Extract YYYY-MM-DD
        if (!acc[date]) acc[date] = { temps: [], midday: null, maxPop: 0 };

        acc[date].temps.push(entry.main.temp); // Stores all temperature for the day in an array to get min and max temperatures
        acc[date].maxPop = Math.max(acc[date].maxPop, entry.pop); // Stores maximum probability of precipitation for the day

        // Selects the midday entry for weather icon (12:00 PM UTC)
        const hour = new Date(entry.dt * 1000).getUTCHours();
        if (hour === 12) acc[date].midday = entry;

        return acc;
    }, {});

    return Object.values(dailyData).slice(0, 5).map((day) => ({
        maxTemp: Math.max(...day.temps), // Finds maximum temperature for the day in the hourly list for that day
        minTemp: Math.min(...day.temps), // Finds minimum temperature for the day in the hourly list for that day
        middayEntry: day.midday || forecast.list.find(e => new Date(e.dt * 1000).getUTCHours() === 12), 
        pop: Math.round(day.maxPop * 100),
    }));
};