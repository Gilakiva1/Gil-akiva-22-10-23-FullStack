import axios from 'axios';

const BASE_URL = 'http://dataservice.accuweather.com/';
const API_KEY = 'SI5rgAdSOg2pYUHTC0RHufNqVS3hxXRK';
const axiosServices = axios.create({ baseURL: BASE_URL });

export const getCities = async (value: string) => {
  const response = await axiosServices.get(`locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`);
  return response.data;
};

export const getCityData = async (key: string) => {
  const response = await axiosServices.get(`currentconditions/v1/${key}?apikey=${API_KEY}&q=${key}`);
  return response.data;
};
