import { useHttp } from "../hooks/httphook";

const useWeatherService = () => {
  const { loading, request, error } = useHttp();
  const _apiBase =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  const _apiKey = process.env.REACT_APP_MY_API_KEY;

  const getTodayWeather = async (city) => {
    const res = await request(
      `${_apiBase}/${city}/today?unitGroup=metric&include=days&key=${_apiKey}`
    );
    return res;
  };

  const getWeatherForecast = async (city, from, till) => {
    const res = await request(
      `${_apiBase}/${city}/${from}/${till}?unitGroup=metric&include=days&key=${_apiKey}`
    );
    return res;
  };

  return { loading, error, getTodayWeather, getWeatherForecast };
};

export default useWeatherService;
