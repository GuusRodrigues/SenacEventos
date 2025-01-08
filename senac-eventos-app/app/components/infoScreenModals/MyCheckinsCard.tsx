import React from "react";
import { MdCalendarToday, MdOutlineAccessTime } from "react-icons/md";

interface MyCheckinsCardProps {
  eventName: string;
  checkinDateTime: string | Date;
}

const MyCheckinsCard: React.FC<MyCheckinsCardProps> = ({
  eventName,
  checkinDateTime,
}) => {
  const date = new Date(checkinDateTime);

  if (isNaN(date.getTime())) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <p className="text-lg font-bold text-gray-900">{`Evento: ${eventName}`}</p>
        <p className="text-sm text-red-600 mt-2">Data e Hora inválidas</p>
      </div>
    );
  }

  const formattedDate = date.toLocaleDateString("pt-BR");
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <p className="text-xl font-bold text-gray-800 mb-2">{`Evento: ${eventName}`}</p>

      <div className="flex items-center mb-3">
        <MdCalendarToday size={20} className="text-blue-600" />
        <p className="ml-2 text-sm text-blue-600">Data e Hora do checkin:</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <MdCalendarToday size={20} className="text-blue-600" />
        <p className="text-sm text-gray-600">{formattedDate}</p>
        <MdOutlineAccessTime size={20} className="text-blue-600" />
        <p className="text-sm text-gray-600">{formattedTime}</p>
      </div>
    </div>
  );
};

export default MyCheckinsCard;