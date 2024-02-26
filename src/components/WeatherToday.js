import { useState, useEffect } from "react";
import useWeatherService from "../services/WeatherService";
import Timer from "./Timer";

const WeatherToday = ({ currentCity, dateFrom }) => {
  const [weather, setWeather] = useState({});
  const { getTodayWeather } = useWeatherService();
  useEffect(() => {
    if (currentCity) {
      onRequest(currentCity);
    }
    // eslint-disable-next-line
  }, [currentCity]);

  const onRequest = (city) => {
    getTodayWeather(city).then(onTodayWeatherLoaded);
  };

  const onTodayWeatherLoaded = (weather) => {
    setWeather(weather);
  };

  const isWeatherLoaded = weather && weather.days && weather.days.length > 0;

  const address = isWeatherLoaded ? weather.address : "";
  const dayOfWeek = isWeatherLoaded
    ? new Date(weather.days[0].datetime).toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";
  const temp = isWeatherLoaded && weather.days[0].temp;
  const icon = isWeatherLoaded && weather.days[0].icon;
  return (
    <>
      <div className="side-bar">
        {isWeatherLoaded && (
          <div className="content-block">
            <div className="side-bar-title">{address}</div>
            <div className="side-bar-temp">
              <img src={`./icons/${icon}.svg`} alt={icon} />
              <p>{temp}&deg;</p>
            </div>
            <div className="side-bar-date">{dayOfWeek}</div>
            <Timer dateFrom={dateFrom} />
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherToday;
