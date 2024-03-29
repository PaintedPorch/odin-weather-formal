export async function getData(location) {
    const weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ab2b5b68cc3a4b2cb63100729241902&q=${location}&days=3`);
    const jsonWeather = await weatherData.json();

    return jsonWeather;
}