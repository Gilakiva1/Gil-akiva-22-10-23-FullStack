import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { getCities } from '../services/weatherService';
import { Cards } from '../component/Cards';
import { Favorites } from '../component/Favorites';
export interface FavoriteData {
  key: string;
  city: string;
}
export const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [cities, setCities] = useState([]);
  const [favorites, setFavorite] = useState<FavoriteData[]>([]);

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
        return (
          <Cards
            key={index}
            cityKey={(option as any).key}
            city={(option as any).localizedName}
            favorites={favorites}
            setFavorite={setFavorite}
          />
        );
      })}
      <Stack direction={'column'}>
        {favorites.map(item => (
          <Button key={item.key} href={`/${item.key}?city=${item.city}`}>
            {item.city}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
