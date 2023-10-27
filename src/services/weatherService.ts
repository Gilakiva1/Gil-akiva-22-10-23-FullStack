import axios from "axios";
import { CityData } from "../component/Cards";

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL! });

export const getCities = async (value: string) => {
  const response = await axiosServices.get(`/?q=${value}`);
  return response.data;
};

export const getCityData = async (key: string) => {
  const response = await axiosServices.get(`/cityData?key=${key}`);
  return response.data;
};

export const getFavorite = async () => {
  const response = await axiosServices.get("/favorite");
  return response.data;
};

export const addFavorite = async (key: string, name: string) => {
  const response = await axiosServices.post(`/`, { key, name });
  return response.data;
};

export const addWeather = async (cityData: CityData) => {
  const response = await axiosServices.post(`/weather`, { cityData });
  return response.data;
};

export const deleteFavorite = async (key: string) => {
  try {
    const response = await axiosServices.delete(`/?key=${key}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};
