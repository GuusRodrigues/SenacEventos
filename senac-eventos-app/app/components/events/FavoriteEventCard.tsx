import React from "react";
import { FaBookmark, FaRegBookmark, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { SaveActivity } from "@/app/interfaces/savedEvents";

interface FavoriteEventCardProps {
  favorite: SaveActivity;
  onRemoveFavorite: (favorite: SaveActivity) => void;
  isFavorited: boolean;
  onToggleFavorite: (favorite: SaveActivity) => void;
}

export default function FavoriteEventCard({
  favorite,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemoveFavorite,
  isFavorited,
  onToggleFavorite,
}: FavoriteEventCardProps) {
  const { activity } = favorite;

  if (!activity) {
    return null;
  }

  const formattedDate = activity.date?.split("-").reverse().join("/") || "Data não disponível";
  const formattedTime = activity.time?.split(":").slice(0, 2).join(":") || "Hora não disponível";
  const description = activity.description || "Descrição não disponível";
  const location = activity.location || "Local não especificado";

  const handleToggleFavorite = () => {
    onToggleFavorite(favorite);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg my-2">
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
      <p className="text-sm text-gray-600 mb-3">{description}</p>

      <div className="flex items-center mb-3">
        <FaMapMarkerAlt size={20} color="#666" />
        <p className="ml-2 text-sm text-gray-600">{location}</p>
      </div>

      {activity.speaker && activity.speaker.length > 0 ? (
        <>
          <h4 className="text-base font-semibold text-gray-800 mb-2">Palestrantes</h4>
          {activity.speaker.map((speaker) => (
            <div key={speaker.idSpeaker} className="mb-2">
              <p className="text-sm text-gray-800 font-bold">{speaker.name || "Nome não disponível"}</p>
              <p className="text-sm text-gray-600">{speaker.description || "Sem descrição"}</p>
              <p className="text-sm text-gray-500">
                {speaker.role || "Sem cargo"} - {speaker.company || "Sem empresa"}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p className="text-sm text-gray-600">Nenhum palestrante disponível.</p>
      )}
    </div>
  );
}