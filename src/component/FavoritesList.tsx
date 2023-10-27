import { Button, Stack } from "@mui/material";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

export const FavoritesList: React.FC = () => {
  const { favorites } = useGlobalContext();

  return (
    <Stack flex={1} sx={{ borderLeft: "1px solid black" }}>
      <Stack direction={"column"}>
        {favorites.map((item, index) => (
          <Link
            key={`${item.key} + {index}`}
            to={`/${item.key}?city=${item.name}`}
            style={{ textAlign: "center" }}
          >
            <Button>{item.name}</Button>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};
