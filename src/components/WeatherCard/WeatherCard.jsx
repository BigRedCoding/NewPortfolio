import "./WeatherCard.css";
import {
  weatherConditions,
  defaultWeatherOptions,
} from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherConditions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
    weatherOption.condition = weatherData.condition;
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img
        src={weatherOption?.url}
        alt={`Image showing ${weatherOption?.day ? "day" : "night"}time and ${
          weatherOption?.condition
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
