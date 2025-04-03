const API_KEY = "a2ee72491e2b768975ee7b4ea79b2278";

async function getSearchSuggestions(query) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
    }
    const data = await response.json();
    return data.map((location) => `${location.name}, ${location.country}`);
}

export default getSearchSuggestions;