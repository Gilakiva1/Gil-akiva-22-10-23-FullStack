import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  addFavorite,
  addWeather,
  deleteFavorite,
  getCityData,
} from "../services/weatherService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGlobalContext } from "../contexts/GlobalContext";

export const Cards: React.FC<CardsProps> = ({ cityKey, city }) => {
  const { favorites, setFavorite } = useGlobalContext();

  const [cityData, setCityData] = useState<CityData>();

  const isFavorites = useMemo(
    () => !!favorites?.find((item) => item.key === cityKey),
    [cityKey, favorites]
  );
  useEffect(() => {
    if (!cityData) return;
    addWeather(cityData);
  }, [cityData]);

  useEffect(() => {
    getCityData(cityKey).then((data) => {
      setCityData({ key: cityKey, city, ...data[0] });
    });
  }, [city, cityKey]);

  const toggleFavorites = () => {
    if (!favorites || !setFavorite) return;
    if (isFavorites) {
      const currentFavorites = favorites.filter((item) => item.key !== cityKey);
      setFavorite(currentFavorites);
      deleteFavorite(cityKey);
    } else {
      setFavorite((prevState) => [...prevState, { key: cityKey, name: city }]);
      addFavorite(cityKey, city);
    }
  };

  return (
    <Stack
      sx={{
        borderRadius: "8px",
        margin: "5px",
        width: "250px",
      }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Stack direction={"column"} alignItems="flex-start">
          <Box component={"span"}>{city}</Box>
          <Stack gap={1} direction="row">
            <Box component={"span"}>{cityData?.Temperature?.Metric?.Value}</Box>
            <Box component={"span"}>{cityData?.WeatherText}</Box>
          </Stack>
        </Stack>
        <Button onClick={toggleFavorites}>
          <FavoriteIcon style={{ color: isFavorites ? "red" : "gray" }} />
        </Button>
      </Stack>
    </Stack>
  );
};

interface CardsProps {
  cityKey: string;
  city: string;
}

export interface CityData {
  key: string;
  city: string;
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
}
