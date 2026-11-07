import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();

  const [allFavorites, setAllFavorites] = useState(() => {
    const saved = localStorage.getItem("minishop_favorites");
    return saved ? JSON.parse(saved) : {};
  });

  const userId = user?.id;

  const favorites = userId
    ? allFavorites[userId] || []
    : [];

  useEffect(() => {
    localStorage.setItem(
      "minishop_favorites",
      JSON.stringify(allFavorites)
    );
  }, [allFavorites]);

  const toggleFavorite = (product) => {
    if (!userId) return;

    setAllFavorites((previous) => {
      const currentFavorites = previous[userId] || [];

      const alreadyExists = currentFavorites.some(
        (item) => item.id === product.id
      );

      const updatedFavorites = alreadyExists
        ? currentFavorites.filter(
            (item) => item.id !== product.id
          )
        : [...currentFavorites, product];

      return {
        ...previous,
        [userId]: updatedFavorites,
      };
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(
      (item) => item.id === productId
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}