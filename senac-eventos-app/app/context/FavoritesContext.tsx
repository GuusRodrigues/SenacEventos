"use client";
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// Define o tipo para o contexto
interface FavoritesContextType {
  favorites: number[];
  setFavorites: Dispatch<SetStateAction<number[]>>;
  refreshFavorites: boolean;
  toggleRefreshFavorites: () => void;
}

// Inicializa o contexto com o tipo ou `undefined`
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [refreshFavorites, setRefreshFavorites] = useState(false);

  const toggleRefreshFavorites = () => setRefreshFavorites(!refreshFavorites);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, refreshFavorites, toggleRefreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};