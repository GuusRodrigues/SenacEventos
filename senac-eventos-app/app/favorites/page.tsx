"use client";
import React, { useEffect, useState } from "react";
import { fetchFavoriteEvents, deleteFavoriteEvent } from "@/app/services/favoriteService";
import FavoriteEventCard from "@/app/components/events/FavoriteEventCard";
import { useFavorites } from "@/app/context/FavoritesContext";
import EventSkeleton from "@/app/components/events/EventSkeleton";
import { FaFrown } from "react-icons/fa";
import { SaveActivity } from "../interfaces/savedEvents";
import TabNavigator from "../components/tabNavgator";

export default function FavoriteEventsScreen() {
  const [favorites, setFavorites] = useState<SaveActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setFavorites: updateContextFavorites, toggleRefreshFavorites, refreshFavorites } = useFavorites();

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedParticipant = localStorage.getItem("participant");
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleRemoveFavorite = async (favorite: SaveActivity) => {
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

  const toggleFavorite = (favorite: SaveActivity) => {
    const isCurrentlyFavorited = favorites.some((fav) => fav.idSaveActivity === favorite.idSaveActivity);

    if (isCurrentlyFavorited) {
      handleRemoveFavorite(favorite);
    }
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-4">
      <FaFrown size={48} color="#64748b" />
      <p className="text-lg font-semibold text-gray-600 mt-4">
        Você ainda não favoritou nenhum evento.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 p-4 bg-white">
      <h1 className="text-lg font-bold mb-4 text-gray-800">Seus eventos favoritos</h1>
      {loading ? (
        <EventSkeleton />
      ) : favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="space-y-4">
          {favorites.map((favorite) => (
            <FavoriteEventCard
              key={favorite.idSaveActivity}
              favorite={favorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorited={true}
              onToggleFavorite={() => toggleFavorite(favorite)}
            />
          ))}
        </div>
      )}
    <TabNavigator />
    </div>
  );
}