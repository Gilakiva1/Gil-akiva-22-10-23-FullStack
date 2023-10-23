import { Stack } from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Cards } from "../component/Cards";

export const Favorites: React.FC = () => {
  const { key } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  return (
    <Stack direction={"column"} alignItems="center" justifyContent="center">
      {key && <Cards cityKey={key} city={city || ""} />}
    </Stack>
  );
};
