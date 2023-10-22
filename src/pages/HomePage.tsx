import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { getCities } from "../services/weatherService";
import { Cards } from "../component/Cards";
import { FavoritesList } from "../component/FavoritesList";

export const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [cities, setCities] = useState<SearchResponse[]>([]);
  const [favorites, setFavorite] = useState<FavoriteData[]>([]);
  const [selectedCity, setSelectedCity] = useState<SearchResponse>();

  const handleSearchCities = async (
    _: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchValue(value);
    if (!value) return;

    const result: SearchResponse[] = await getCities(value);
    setCities(result);
  };
  const onSelectCity = async (
    _: React.SyntheticEvent<Element, Event>,
    option: SearchResponse | null
  ) => {
    setSelectedCity(option as unknown as SearchResponse);
  };

  return (
    <Stack direction="row" sx={{ height: "100%", my: 3, mx: 1 }}>
      <Stack alignItems="center" flex={5}>
        <Autocomplete
          getOptionLabel={(option) => option.LocalizedName}
          disablePortal
          options={cities}
          inputValue={searchValue}
          onInputChange={handleSearchCities}
          onChange={onSelectCity}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.LocalizedName}
            </Box>
          )}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />

        {selectedCity && (
          <Cards
            cityKey={selectedCity.Key}
            city={selectedCity.LocalizedName}
            favorites={favorites}
            setFavorite={setFavorite}
          />
        )}
      </Stack>

      {!!favorites.length && <FavoritesList favorites={favorites} />}
    </Stack>
  );
};

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
