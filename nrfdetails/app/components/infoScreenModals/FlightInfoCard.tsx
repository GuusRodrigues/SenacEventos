"use client";

import React from "react";
import { FaPlane } from "react-icons/fa";

const FlightInfoCard: React.FC = () => {
  const flightInfoData = [
    {
      date: "9 de janeiro – Quinta-feira",
      departure: "9h25 - Recife",
      stops: [
        { location: "Fort Lauderdale", time: "15h30" },
        { location: "New York", time: "23h01" },
      ],
    },
    {
      date: "17 de janeiro - Sexta-feira",
      departure: "9h00 - New York",
      stops: [
        { location: "Fort Lauderdale", time: "14h18" },
        { location: "Recife", time: "6h25 (18/01)" },
      ],
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">Informações de Voo</h1>
      {flightInfoData.map((flight, index) => (
        <div
          key={index}
          className="bg-gray-100 p-6 rounded-lg mb-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-blue-500 mb-4">{flight.date}</h2>

          {/* Ícone e Partida */}
          <div className="flex items-center mb-4">
            <FaPlane size={28} className="text-blue-500 mr-3" />
            <p className="text-lg text-gray-800">Partida: {flight.departure}</p>
          </div>

          {/* Escalas */}
          {flight.stops.map((stop, stopIndex) => (
            <div key={stopIndex} className="flex items-center mb-3">
              <FaPlane size={24} className="text-gray-600 mr-3" />
              <p className="text-lg text-gray-600">
                Escala: {stop.location} às {stop.time}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlightInfoCard;