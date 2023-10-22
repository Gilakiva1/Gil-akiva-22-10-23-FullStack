import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCityData } from '../services/weatherService';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteData } from '../pages/HomePage';
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
export const Cards: React.FC<CardsProps> = ({ cityKey: key, city, favorites, setFavorite }) => {
  const [cityData, setCityData] = useState<CityData>();

  useEffect(() => {
    getCityData(key).then(data => {
      setCityData(data);
    });
  }, [key]);

  console.log({ cityData });

  return (
    <Stack
      sx={{
        borderRadius: '8px',
        margin: '5px'
      }}
    >
      <Stack direction={'column'}>
        <Box>{city}</Box>
        <Stack>
          <Box>{cityData?.Temperature.Metric.Value}</Box>
          <Box>{cityData?.WeatherText}</Box>
        </Stack>
      </Stack>
      <Button
        onClick={() => {
          if (!favorites || !setFavorite) return;
          const result = favorites.find(item => item.key === key);
          if (result) {
            const currentFavorites = favorites.filter(item => item.key !== key);
            setFavorite(currentFavorites);
          } else {
            setFavorite(prevState => [...prevState, { key, city }]);
          }
        }}
      >
        <FavoriteIcon />
      </Button>
    </Stack>
  );
};
