"use client";
import { useEffect, useState, useCallback } from "react";
import { FaFrown } from "react-icons/fa";
import { fetchEvents } from "@/app/services/eventService";
import { createFavoriteEvent, deleteFavoriteEvent, fetchFavoriteEvents } from "@/app/services/favoriteService";
import { Event } from "@/app/interfaces/event";
import { SaveActivity } from "@/app/interfaces/savedEvents";
import EventSkeleton from "@/app/components/events/EventSkeleton";
import EventCard from "@/app/components/events/EventCard";
import { useFavorites } from "@/app/context/FavoritesContext";

interface EventListProps {
  selectedDate: string;
}

export default function EventList({ selectedDate }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, setFavorites, refreshFavorites, toggleRefreshFavorites } = useFavorites();
  const [favoriteSaveIds, setFavoriteSaveIds] = useState<{ [idActivity: number]: number }>({});

  const initialize = useCallback(async () => {
    try {
      const storedParticipant = localStorage.getItem("participant");
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        const fetchedFavorites = await fetchFavoriteEvents(participant.idParticipant);

        const favoriteIds = fetchedFavorites.map((fav: SaveActivity) => fav.activity.idActivity);
        setFavorites(favoriteIds);

        const fetchedFavoritesMap = fetchedFavorites.reduce((acc, fav: SaveActivity) => {
          acc[fav.activity.idActivity] = fav.idSaveActivity;
          return acc;
        }, {} as { [idActivity: number]: number });
        setFavoriteSaveIds(fetchedFavoritesMap);

        await loadEvents();
      }
    } catch (error) {
      console.error("Erro ao inicializar:", error);
    }
  }, [setFavorites]);

  useEffect(() => {
    initialize();
  }, [initialize, refreshFavorites]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = async (event: Event) => {
    try {
      const storedParticipant = localStorage.getItem("participant");
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        const newFavorite: SaveActivity = await createFavoriteEvent({
          idParticipant: participant.idParticipant,
          idActivity: event.idActivity,
        });

        setFavorites((prevFavorites) => [...prevFavorites, event.idActivity]);
        setFavoriteSaveIds((prevMap) => ({
          ...prevMap,
          [event.idActivity]: newFavorite.idSaveActivity,
        }));
        toggleRefreshFavorites();
      }
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  const handleRemoveFavorite = async (idActivity: number, idSaveActivity: number) => {
    try {
      await deleteFavoriteEvent(idSaveActivity);
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== idActivity));
      setFavoriteSaveIds((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[idActivity];
        return updatedMap;
      });
      toggleRefreshFavorites();
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const filteredEvents = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date).toISOString().slice(5, 10);
        return eventDate === selectedDate;
      })
    : events;

  if (loading) {
    return (
      <div className="flex-1">
        <EventSkeleton />
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <FaFrown size={48} color="#64748b" className="mb-4" />
        <p className="text-lg font-semibold text-gray-600">
          Não há eventos disponíveis no momento
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4 text-gray-800">Sua programação</p>
      {filteredEvents.map((event) => (
        <EventCard
          key={event.idActivity}
          event={event}
          isFavorite={favorites.includes(event.idActivity)}
          onFavoriteSuccess={handleSaveFavorite}
          onRemoveFavorite={() => handleRemoveFavorite(event.idActivity, favoriteSaveIds[event.idActivity])}
        />
      ))}
    </div>
  );
}