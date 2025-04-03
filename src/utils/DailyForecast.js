export const processDailyForecast = (forecast) => {
    const dailyData = forecast.list.reduce((acc, entry) => {
        const date = new Date(entry.dt * 1000).toISOString().split("T")[0]; // Extract YYYY-MM-DD
        if (!acc[date]) acc[date] = { temps: [], midday: null, pop: 0, entries: 0 };

        acc[date].temps.push(entry.main.temp);
        acc[date].pop += entry.pop; // Accumulate precipitation probability
        acc[date].entries++;

        // Select the midday entry (12:00 PM UTC)
        const hour = new Date(entry.dt * 1000).getUTCHours();
        if (hour === 12) acc[date].midday = entry;

        return acc;
    }, {});

    return Object.values(dailyData).slice(0, 5).map((day) => ({
        maxTemp: Math.max(...day.temps),
        minTemp: Math.min(...day.temps),
        middayEntry: day.midday || forecast.list.find(e => new Date(e.dt * 1000).getUTCHours() === 12), 
        pop: Math.round((day.pop / day.entries) * 100),
    }));
};