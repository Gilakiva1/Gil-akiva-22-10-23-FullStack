import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { getCities } from "../services/weatherService";
import { Cards } from "../component/Cards";
import { FavoritesList } from "../component/FavoritesList";
import { useGlobalContext } from "../contexts/GlobalContext";

export const HomePage: React.FC = () => {
  const { favorites } = useGlobalContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [cities, setCities] = useState<SearchResponse[]>([]);
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
    <Stack direction="row" sx={{ height: "100%" }}>
      <Stack alignItems="center" flex={5} gap={3}>
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
          <Cards cityKey={selectedCity.Key} city={selectedCity.LocalizedName} />
        )}
      </Stack>

      {!!favorites.length && <FavoritesList />}
    </Stack>
  );
};

interface SearchResponse {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
}
