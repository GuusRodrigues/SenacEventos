/*import React, { useEffect, useState } from "react";
//import { fetchFavoriteEvents, deleteFavoriteEvent } from "@/services/favoriteService";
import { useFavorites } from "@/context/FavoritesContext";

const FavoriteEventsPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const { setFavorites: updateContextFavorites, toggleRefreshFavorites, refreshFavorites } =
    useFavorites();

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedParticipant = localStorage.getItem("participant");
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);

          if (participant.idParticipant) {
            await loadFavorites(participant.idParticipant);
          }
        } else {
          console.warn("Usuário não autenticado. Por favor, faça login novamente.");
        }
      } catch (error) {
        console.error("Erro ao inicializar favoritos:", error);
      }
    };

    initialize();
  }, [refreshFavorites]);

  const loadFavorites = async (participantId: number) => {
    try {
      setLoading(true);
      const fetchedFavorites = await fetchFavoriteEvents(participantId);
      setFavorites(fetchedFavorites);
      updateContextFavorites(fetchedFavorites.map((fav) => fav.activity.idActivity));
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favorite: any) => {
    try {
      await deleteFavoriteEvent(favorite.idSaveActivity);
      const updatedFavorites = favorites.filter(
        (item) => item.idSaveActivity !== favorite.idSaveActivity
      );
      setFavorites(updatedFavorites);
      updateContextFavorites(updatedFavorites.map((fav) => fav.activity.idActivity));
      toggleRefreshFavorites();
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const toggleFavorite = (favorite: any) => {
    const isCurrentlyFavorited = favorites.some(
      (fav) => fav.idSaveActivity === favorite.idSaveActivity
    );

    if (isCurrentlyFavorited) {
      handleRemoveFavorite(favorite);
    }
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-4xl text-gray-500">:(</div>
      <p className="text-lg font-semibold text-gray-600">
        Você ainda não favoritou nenhum evento.
      </p>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4 text-gray-800">Seus eventos favoritos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <ul className="list-none">
          {favorites.map((item) => (
            <li key={item.idSaveActivity} className="mb-4">
              <div className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{item.activity.name}</h2>
                  <p className="text-gray-600">{item.activity.description}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="text-red-500 font-bold"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteEventsPage;*/
