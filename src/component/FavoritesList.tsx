import { Button, Stack } from "@mui/material";
import { FavoriteData } from "../pages/HomePage";

interface FavoritesListProps {
  favorites: FavoriteData[];
}
export const FavoritesList: React.FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <Stack flex={1} sx={{ borderLeft: "1px solid black" }}>
      <Stack direction={"column"}>
        {favorites.map((item) => (
          <Button key={item.key} href={`/${item.key}?city=${item.city}`}>
            {item.city}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
