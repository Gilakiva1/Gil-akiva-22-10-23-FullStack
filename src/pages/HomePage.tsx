import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { getCities, getCityData } from '../services/weatherService';
import { Cards } from '../component/Cards';

export const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [cities, setCities] = useState([]);

  return (
    <Stack>
      <TextField
        value={searchValue}
        onChange={async event => {
          const { value } = event.target;
          setSearchValue(value);
          if (!value) return;
          const result = await getCities(value);
          setCities(result as any);
        }}
        sx={{ width: 300 }}
      />
      {cities?.map((option, index) => {
        return <Cards key={index} cityKey={(option as any).key} city={(option as any).localizedName} />;
      })}
    </Stack>
  );
};
