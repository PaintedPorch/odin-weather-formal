import "./css/meyerReset.css";
import "./css/style.css";
import { getData } from "./getData";
import { setListSrc, setText, setSingleText } from "./domDisplay";

const textField = document.getElementById("input");
const hourDivList = document.querySelectorAll(".hourIcon");
const dayDivList = document.querySelectorAll(".dayIcon");
const dayTextList = document.querySelectorAll(".day");
const hourTemps = document.querySelectorAll(".hourTemp");
const dayTemps = document.querySelectorAll(".dayTemp");
const location = document.querySelector(".location");
const tempExtremesField = document.querySelector(".tempExtremes");
const headerTemp = document.querySelector(".headerTempLayout");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const rainChance = document.querySelector(".rainChance");
const windSpeed = document.querySelector(".windSpeed");
const celsiusRadio = document.getElementById("celsius");
const fahrenheitRadio = document.getElementById("fahrenheit");

textField.onchange = async() => {
    try {
        let hoursSrcList = [];
        let daySrcList = [];
        let dayStringList = [];
        let hourTempList = [];
        let dayTempList = [];
        let tempExtremes = "";
        let headerTempValue = "";
        let sunriseValue = "";
        let sunsetValue = "";
        let rainChanceValue = "";
        let windSpeedValue = "";
        let value = textField.value;

        let weatherData = await getData(value);

        let hoursList = weatherData.forecast.forecastday["0"].hour;
        for (let i = 0; i < hoursList.length; i++) {
            hoursSrcList.push(hoursList[i].condition.icon);
            hourTempList.push(hoursList[i]["temp_c"]);
            hourTempList[i] = `${hourTempList[i]}°C`;
        }

        let dayList = weatherData.forecast.forecastday;
        for (let i = 0; i < dayList.length; i++) {
            daySrcList.push(dayList[i].day.condition.icon);
            dayStringList.push(dayList[i].date);
            dayTempList.push(dayList[i].day["avgtemp_c"]);
            dayTempList[i] = `${dayTempList[i]}°C`;
        }

        for (let i = 0; i < dayStringList.length; i++) {
            let sliceOne = dayStringList[i].substring(8, 10);
            let sliceTwo = dayStringList[i].substring(5, 7);
            dayStringList[i] = `${sliceOne}-${sliceTwo}`;
        }

        tempExtremes = `L: ${weatherData.forecast.forecastday["0"].day["mintemp_c"]}°C | H: ${weatherData.forecast.forecastday["0"].day["maxtemp_c"]}°C`;
        headerTempValue = `${weatherData.current["temp_c"]}°C`;
        sunriseValue = `sunrise: ${weatherData.forecast.forecastday["0"].astro.sunrise}`;
        sunsetValue = `sunset: ${weatherData.forecast.forecastday["0"].astro.sunset}`;
        rainChanceValue = `chance of rain: ${weatherData.forecast.forecastday["0"].day["daily_chance_of_rain"]} %`;
        windSpeedValue = `wind speed: ${weatherData.current["wind_kph"]} km/h`;

        setSingleText(location, value);
        setSingleText(tempExtremesField, tempExtremes);
        setSingleText(headerTemp, headerTempValue);
        setSingleText(sunrise, sunriseValue);
        setSingleText(sunset, sunsetValue);
        setSingleText(rainChance, rainChanceValue);
        setSingleText(windSpeed, windSpeedValue);
        setListSrc(hourDivList, hoursSrcList);
        setListSrc(dayDivList, daySrcList);
        setText(dayTextList, dayStringList);
        setText(hourTemps, hourTempList);
        setText(dayTemps, dayTempList);

        setTimeout(() => {
            textField.value = "";
        }, 800);
    }
    catch (error) {
        if (error instanceof TypeError) {
            alert("Location not Found");
        }

        setTimeout(() => {
            textField.value = "";
        }, 800);
    }
};
celsiusRadio.onchange = () => {
    
};
fahrenheitRadio.onchange = () => {
    
};