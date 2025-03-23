function roundToNearestHalf(num) {
    return Math.round(num * 2) / 2;
}

export function roundWeatherData(obj) {
    if (Array.isArray(obj)) {
      return obj.map(roundWeatherData);
    }
  
    if (obj !== null && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, roundWeatherData(value)])
      );
    }
  
    if (typeof obj === 'number') {
      return roundToNearestHalf(obj);
    }
  
    return obj;
  }