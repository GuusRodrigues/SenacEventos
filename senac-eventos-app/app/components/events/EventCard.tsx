"use client";

import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "@/app/interfaces/event";
import EventDetails from "./EventDetailsModal"; // Modal de detalhes do evento

interface EventCardProps {
  event: Event;
  isFavorite: boolean;
  onFavoriteSuccess?: (event: Event) => void;
  onRemoveFavorite?: () => void;
  onCheckin?: (event: Event) => void;
  loadEvents: () => Promise<void>;
}

export default function EventCard({
  event,
  isFavorite,
  onFavoriteSuccess,
  onRemoveFavorite,
  onCheckin,
  loadEvents,
}: EventCardProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    const checkIfCheckedIn = async () => {
      try {
        const storedParticipant = localStorage.getItem("participant");
        if (!storedParticipant) {
          setHasCheckedIn(false);
          return;
        }
        const participant = JSON.parse(storedParticipant);
        const isCheckedIn = event.checkins?.some(
          (checkin) => checkin.participant?.idParticipant === participant.idParticipant
        );
        setHasCheckedIn(!!isCheckedIn);
      } catch {
        setHasCheckedIn(false);
      }
    };
    checkIfCheckedIn();
  }, [event.checkins]);

  const handleFavorite = () => {
    if (onFavoriteSuccess) onFavoriteSuccess(event);
  };

  const handleRemoveFavorite = () => {
    if (onRemoveFavorite) onRemoveFavorite();
  };

  const handleCheckin = () => {
    if (onCheckin) onCheckin(event);
    setModalVisible(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg p-4 shadow-lg my-2 cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setModalVisible(true)}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
          {isFavorite ? (
            <button onClick={handleRemoveFavorite}>
              <FaBookmark size={24} color="#0056D6" />
            </button>
          ) : (
            <button onClick={handleFavorite}>
              <FaRegBookmark size={24} color="#666" />
            </button>
          )}
        </div>
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <FaCalendarAlt size={20} color="#0056D6" />
            <p className="ml-2 text-sm text-blue-600">{event.date.split("-").reverse().join("/")}</p>
          </div>
          <div className="flex items-center">
            <FaClock size={20} color="#0056D6" />
            <p className="ml-2 text-sm text-blue-600">{event.time.split(":").slice(0, 2).join(":")}</p>
          </div>
        </div>
        <h4 className="text-base font-semibold text-gray-800 mb-2">Sobre</h4>
        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
        <div className="flex items-center mb-3">
          <FaMapMarkerAlt size={20} color="#666" />
          <p className="ml-2 text-sm text-gray-600">{event.location}</p>
        </div>
      </div>

      {/* Modal de Detalhes do Evento */}
      <EventDetails
        event={event}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCheckin={handleCheckin}
        hasCheckedIn={hasCheckedIn}
        loadEvents={loadEvents}
      />
    </>
  );
}