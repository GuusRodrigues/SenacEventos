"use client";

import React, { useState } from "react";
import { FaBookmark, FaRegBookmark, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { SaveActivity } from "@/app/interfaces/savedEvents";
import FavoriteEventDetails from "./FavoriteEventDetails";

interface FavoriteEventCardProps {
  favorite: SaveActivity;
  onRemoveFavorite: (favorite: SaveActivity) => void;
  isFavorited: boolean;
  onToggleFavorite: (favorite: SaveActivity) => void;
  hasCheckedIn: boolean; // Adicionada a propriedade aqui
}

export default function FavoriteEventCard({
  favorite,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemoveFavorite,
  isFavorited,
  onToggleFavorite,
  hasCheckedIn, // Recebe como prop
}: FavoriteEventCardProps) {
  const { activity } = favorite;
  const [isModalVisible, setModalVisible] = useState(false);

  const formattedDate = activity.date?.split("-").reverse().join("/") || "Data não disponível";
  const formattedTime = activity.time?.split(":").slice(0, 2).join(":") || "Hora não disponível";

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(favorite);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg p-4 shadow-sm my-2 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setModalVisible(true)}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">{activity.title || "Título não disponível"}</h3>
          <button onClick={handleToggleFavorite}>
            {isFavorited ? (
              <FaBookmark size={24} color="#0056D6" />
            ) : (
              <FaRegBookmark size={24} color="#0056D6" />
            )}
          </button>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <FaCalendarAlt size={20} color="#0056D6" />
            <p className="ml-2 text-sm text-blue-600">{formattedDate}</p>
          </div>
          <div className="flex items-center">
            <FaClock size={20} color="#0056D6" />
            <p className="ml-2 text-sm text-blue-600">{formattedTime}</p>
          </div>
        </div>

        <h4 className="text-base font-semibold text-gray-800 mb-2">Sobre</h4>
        <p className="text-sm text-gray-600 mb-3">{activity.description || "Descrição não disponível"}</p>

        <div className="flex items-center mb-3">
          <FaMapMarkerAlt size={20} color="#666" />
          <p className="ml-2 text-sm text-gray-600">{activity.location || "Local não especificado"}</p>
        </div>
      </div>

      {isModalVisible && (
        <FavoriteEventDetails
          favorite={favorite}
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          loadFavorites={async () => {}}
          onCheckin={() => console.log("Check-in realizado")}
          hasCheckedIn={hasCheckedIn} // Propriedade passada corretamente
        />
      )}
    </>
  );
}