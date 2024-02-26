import { useState, useEffect } from "react";
import useWeatherService from "../services/WeatherService";
import ForecastItem from "./ForecastItem";

const ForecastList = ({ currentObj }) => {
  const [forecast, setForecast] = useState([]);
  const { getWeatherForecast } = useWeatherService();

  useEffect(() => {
    if (currentObj) {
      onRequest(currentObj);
    }
    // eslint-disable-next-line
  }, [currentObj]);

  const onRequest = (currentObj) => {
    const { city, from, till } = currentObj;
    getWeatherForecast(city, from, till).then(onWeatherForecastLoaded);
  };

  const onWeatherForecastLoaded = (weather) => {
    setForecast(weather);
  };

  return (
    <div className="forecast-list">
      <h3>
        {currentObj &&
          `Weather in ${currentObj?.city} from ${currentObj?.from} till ${currentObj?.till}`}
      </h3>

      <div className="list">
        {forecast?.days?.map((el) => (
          <ForecastItem obj={el} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
