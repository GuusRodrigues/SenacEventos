"use client";

import React from "react";
import { FaPlane } from "react-icons/fa";

const FlightInfoCard: React.FC = () => {
  const flightInfoData = [
    {
      group: "GRUPO AZUL/DELTA",
      flights: [
        {
          date: "9 de janeiro – Quinta-feira",
          departure: "9h25 - Recife",
          origin: "Recife",
          destination: "Fort Lauderdale",
          flightNumber: "AZUL 8712",
          arrival: "15h30 - Fort Lauderdale",
          stops: [
            { location: "New York (JFK)", time: "23h01" },
          ],
        },
        {
          date: "17 de janeiro - Sexta-feira",
          departure: "9h00 - New York",
          origin: "New York (JFK)",
          destination: "Fort Lauderdale",
          flightNumber: "DELTA 840",
          arrival: "14h18 - Fort Lauderdale",
          stops: [
            { location: "Recife", time: "6h25 (18/01)" },
          ],
        },
      ],
    },
    {
      group: "GRUPO AMERICAN",
      flights: [
        {
          date: "9 de janeiro – Quinta-feira",
          departure: "9h25 - Recife",
          origin: "Recife",
          destination: "Fort Lauderdale",
          flightNumber: "AZUL 8712",
          arrival: "15h30 - Fort Lauderdale",
          stops: [
            { location: "New York (JFK)", time: "23h01" },
          ],
        },
        {
          date: "17 de janeiro - Sexta-feira",
          departure: "9h00 - New York",
          origin: "New York (JFK)",
          destination: "Fort Lauderdale",
          flightNumber: "DELTA 305",
          arrival: "14h18 - Fort Lauderdale",
          stops: [
            { location: "Recife", time: "6h25 (18/01)" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="p-2 bg-white w-full h-full">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">Informações de Voo</h1>
      {flightInfoData.map((group, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-bold text-blue-500 mb-4">{group.group}</h2>
          {group.flights.map((flight, flightIndex) => (
            <div key={flightIndex} className="bg-gray-100 p-6 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold text-blue-500 mb-4">{flight.date}</h3>
              <div className="flex items-center mb-4">
                <FaPlane size={28} className="text-blue-500 mr-3" />
                <p className="text-lg text-gray-800">Partida: {flight.departure}</p>
              </div>

              <div className="flex items-center mb-3">
                <p className="text-lg text-gray-800 font-semibold">Origem: {flight.origin}</p>
                <p className="text-lg text-gray-800 ml-4">Destino: {flight.destination}</p>
              </div>

              <div className="flex items-center mb-3">
                <p className="text-lg text-gray-800">Voo: {flight.flightNumber}</p>
                <p className="text-lg text-gray-800 ml-4">Chegada: {flight.arrival}</p>
              </div>

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
      ))}
    </div>
  );
};

export default FlightInfoCard;