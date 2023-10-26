import axios from "axios";

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL! });

export const getCities = async (value: string) => {
  const response = await axiosServices.get(`/?q=${value}`);
  console.log({ response });
  return response.data;
};

export const getCityData = async (key: string) => {
  const response = await axiosServices.get(`/cityData?key=${key}`);
  console.log({ response });
  return response.data;
};
export const addFavorite = async (key: string, name: string) => {
  const response = await axiosServices.post(`/`, { key, name });
  console.log({ response });
  return response.data;
};
