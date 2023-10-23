import { createContext, ReactNode, useContext, useState } from "react";

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
  city: string;
}
