import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getCityData } from "../services/weatherService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteData } from "../pages/HomePage";
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
export const Cards: React.FC<CardsProps> = ({
  cityKey,
  city,
  favorites,
  setFavorite,
}) => {
  const [cityData, setCityData] = useState<CityData>();
  const isFavorites = useMemo(() => {
    return !!favorites?.find((item) => item.key === cityKey);
  }, [cityKey, favorites]);

  useEffect(() => {
    console.log({ cityKey });
    getCityData(cityKey).then((data) => {
      setCityData(data);
    });
  }, [cityKey]);

  console.log({ cityData });
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
      }}
    >
      <Stack direction={"column"}>
        <Box>{city}</Box>
        <Stack>
          <Box>{cityData?.Temperature.Metric.Value}</Box>
          <Box>{cityData?.WeatherText}</Box>
        </Stack>
      </Stack>
      <Button onClick={toggleFavorites}>
        <FavoriteIcon style={{ color: isFavorites ? "red" : "gray" }} />
      </Button>
    </Stack>
  );
};
