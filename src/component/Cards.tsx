import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getCityData } from "../services/weatherService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteData } from "../pages/HomePage";

export const Cards: React.FC<CardsProps> = ({
  cityKey,
  city,
  favorites,
  setFavorite,
}) => {
  const [cityData, setCityData] = useState<CityData>();

  const isFavorites = useMemo(
    () => !!favorites?.find((item) => item.key === cityKey),
    [cityKey, favorites]
  );

  useEffect(() => {
    getCityData(cityKey).then((data) => {
      setCityData(data[0]);
    });
  }, [cityKey]);

  const toggleFavorites = () => {
    if (!favorites || !setFavorite) return;
    if (isFavorites) {
      const currentFavorites = favorites.filter((item) => item.key !== cityKey);
      setFavorite(currentFavorites);
    } else {
      setFavorite((prevState) => [...prevState, { key: cityKey, city }]);
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
      <Stack direction="row">
        <Stack direction={"column"} alignItems="flex-start">
          <Box component={"span"}>{city}</Box>
          <Stack gap={"5px"} direction="row">
            <Box component={"span"}>{cityData?.Temperature.Metric.Value}</Box>
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
  favorites?: FavoriteData[];
  setFavorite?: React.Dispatch<React.SetStateAction<FavoriteData[]>>;
}

interface CityData {
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
