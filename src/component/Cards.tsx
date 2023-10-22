import { Box, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { getCityData } from '../services/weatherService';
interface CardsProps {
  cityKey: string;
  city: string;
}
export const Cards: React.FC<CardsProps> = ({ cityKey: key, city }) => {
  const cityData = useMemo(async () => {
    return await getCityData(key);
  }, [key]);

  return (
    <Stack
      sx={{
        borderRadius: '8px',
        margin: '5px'
      }}
    >
      <Stack direction={'column'}>
        <Box>{city}</Box>
      </Stack>
    </Stack>
  );
};
//
