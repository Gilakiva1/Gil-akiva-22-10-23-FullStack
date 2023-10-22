import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { getCities } from "../services/weatherService";
import { Cards } from "../component/Cards";
import { FavoritesList } from "../component/FavoritesList";

export interface FavoriteData {
  key: string;
  city: string;
}

interface SearchResponse {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
}
export const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [cities, setCities] = useState<SearchResponse[]>([]);
  const [favorites, setFavorite] = useState<FavoriteData[]>([]);

  const handleSearchCities = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchValue(value);
    if (!value) return;
    const result: SearchResponse[] = await getCities(value);
    setCities(result);
  };

  return (
    <Stack direction="row" sx={{ height: "100%", my: 3, mx: 1 }}>
      <Stack alignItems="center" flex={5}>
        <TextField
          value={searchValue}
          onChange={handleSearchCities}
          sx={{ width: 300 }}
        />
        {cities?.map((option, index) => {
          return (
            <Cards
              key={index}
              cityKey={(option as any).Key}
              city={(option as any).localizedName}
              favorites={favorites}
              setFavorite={setFavorite}
            />
          );
        })}
      </Stack>

      {!!favorites.length && <FavoritesList favorites={favorites} />}
    </Stack>
  );
};
