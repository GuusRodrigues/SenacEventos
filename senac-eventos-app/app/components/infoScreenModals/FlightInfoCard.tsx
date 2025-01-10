"use client";

import React from "react";
import { FaPlane, FaArrowDown } from "react-icons/fa";

const FlightInfoCard: React.FC = () => {
  const flightInfoData = [
    {
      group: "GRUPO AMERICAN",
      flights: [
        {
          date: "09 de janeiro – Quinta-feira",
          departure: "18h - Recife",
          flightNumber: "AA 7682 (GOL 1621)",
          arrival: "21h15 - Guarulhos",
        },
        {
          date: "09 de janeiro – Quinta-feira",
          departure: "23h15 - Guarulhos",
          flightNumber: "AA 950",
          arrival: "07h00 (10 JAN 25) - New York (JFK)",
        },
        {
          date: "17 de janeiro – Sexta-feira",
          departure: "22h45 - New York (JFK)",
          flightNumber: "AA 973",
          arrival: "10h25 - Rio Galeão",
        },
        {
          date: "18 de janeiro – Sábado",
          departure: "15h10 - Rio Galeão",
          flightNumber: "AA 7723",
          arrival: "18h00 - Recife",
        },
      ],
    },
    {
      group: "GRUPO AZUL/JETBLUE/DELTA",
      flights: [
        {
          date: "10 de janeiro – Sexta-feira",
          departure: "12h20 - Recife",
          flightNumber: "AZUL 8710",
          arrival: "19h - Orlando",
        },
        {
          date: "11 de janeiro – Sábado",
          departure: "06h20 - Orlando",
          flightNumber: "JETBLUE 1184",
          arrival: "08h59 - New York (JFK)",
        },
        {
          date: "17 de janeiro – Sexta-feira (Previsto)",
          departure: "11h30 - New York (JFK)",
          flightNumber: "DELTA 2090",
          arrival: "14h30 - Orlando",
        },
        {
          date: "17 de janeiro – Sexta-feira (Previsto)",
          departure: "15h43 - New York (JFK)",
          flightNumber: "DELTA 1010",
          arrival: "18h48 - Orlando",
        },
        {
          date: "19 de janeiro – Domingo",
          departure: "21h - Orlando",
          flightNumber: "AZUL 8711",
          arrival: "06h50 - Recife",
        },
      ],
    },
  ];

  return (
    <div className="p-2 bg-white w-full h-full">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">Informações de Voo</h1>
      {flightInfoData.map((group, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-blue-500 mb-4">{group.group}</h2>
          {group.flights.map((flight, flightIndex) => (
            <div
              key={flightIndex}
              className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4"
            >
              <h3 className="text-base font-semibold text-blue-500 mb-4">
                {flight.date}
              </h3>
              <div className="flex items-center mb-4">
                <FaPlane className="text-blue-500 w-6 h-6 mr-3" />
                <p className="text-sm text-gray-800">Partida: {flight.departure}</p>
              </div>

              <div className="flex items-center mb-3">
                <FaArrowDown className="text-green-500 w-6 h-6 mr-3" />
                <p className="text-sm text-gray-800">Chegada: {flight.arrival}</p>
              </div>

              <div className="flex items-center mb-3">
                <p className="text-sm text-gray-800">Voo: {flight.flightNumber}</p>
              </div>
            </div>
          ))}     
        </div>
      ))}
    </div>
  );
};

export default FlightInfoCard;
