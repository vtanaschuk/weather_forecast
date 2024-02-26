import { useHttp } from "../hooks/httphook";

const useCitiesService = () => {
  const { loading, request, error } = useHttp();
  const _apiBase = "http://localhost:3001";

  const getCities = async (city) => {
    const res = await request(`${_apiBase}/cities`);
    return res;
  };

  return { loading, error, getCities };
};

export default useCitiesService;
