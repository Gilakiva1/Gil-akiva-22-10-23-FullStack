import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFavorite } from "../services/weatherService";

interface ContextValuesProps {
  setFavorite: React.Dispatch<React.SetStateAction<FavoriteData[]>>;
  favorites: FavoriteData[];
}

const initialState: ContextValuesProps = {
  setFavorite: () => {},
  favorites: [],
};

const GlobalContext = createContext(initialState);

type GlobalProviderProps = {
  children: ReactNode;
};

function GlobalProvider({ children }: GlobalProviderProps) {
  const [favorites, setFavorite] = useState<FavoriteData[]>([]);

  useEffect(() => {
    if (!favorites.length) {
      getFavorite().then((result) => {
        setFavorite(result);
      });
    }
  }, [favorites]); // Include favorites as a dependency if needed

  return (
    <GlobalContext.Provider value={{ favorites, setFavorite }}>
      {children}
    </GlobalContext.Provider>
  );
}
const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };

export interface FavoriteData {
  key: string;
  name: string;
}
