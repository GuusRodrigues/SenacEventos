"use client";

import React from "react";
import { FaMapMarkerAlt, FaCalendar, FaPlane } from "react-icons/fa";

const TourismInfoCard: React.FC = () => {
  const tourismInfoData = [
    {
      title: "Informações Gerais e Dicas Úteis",
      items: [
        "Código DDI: 01 (Estados Unidos) - 212 (Nova York)",
        "Fuso horário: New York é de -1h em relação ao horário de Brasília",
        "Temperatura Janeiro: -3°C média, podendo chegar a -8°C.",
        "Eletricidade: Rede 110 volts, adaptador necessário para tomadas",
        "Gorjeta: Paga entre 15% e 20% nos serviços. Preferencialmente em dinheiro.",
        "Bebidas alcoólicas: Somente para maiores de 21 anos, não é permitido consumir nas ruas",
        "Medidas: Temperaturas em Fahrenheit (ºF), distâncias em milhas (mi)",
        "Transporte: Passe de transporte ilimitado (7 dias ou 30 dias), use metrô para evitar congestionamentos",
        "O que vestir: Casacos grossos, roupas térmicas, botas para neve, cachecol, luvas e gorros",
        "Leve roupas confortáveis e adequadas ao inverno em Nova York",
        "Tenha sempre uma garrafa de água e lanches leves",
        "Mantenha os documentos necessários sempre à mão",
        "Planeje o transporte com antecedência para evitar atrasos",
      ],
      icon: <FaMapMarkerAlt size={28} className="text-blue-500 mr-4" />,
    },
    {
      title: "Programação de Atividades",
      items: [
        "10 de janeiro: Reunião de integração no Millennium Hotel Broadway Times Square",
        "11 de janeiro: City tour cultural",
        "12 de janeiro: NRF das 8h às 17h, incluindo visita guiada das 12h às 14h",
        "13 de janeiro: NRF das 8h às 17h",
        "14 de janeiro: NRF das 8h às 17h",
        "15 de janeiro: Visita ao Consulado-Geral do Brasil em New York às 11h",
        "16 de janeiro: Visitas técnicas pela manhã",
      ],
      icon: <FaCalendar size={28} className="text-blue-500 mr-4" />,
    },
    {
      title: "Dicas de Transporte",
      items: [
        "Se você ficará uma semana ou mais, compre o passe de transporte ilimitado (7 ou 30 dias)",
        "Evite o trânsito, use o metrô para maior rapidez",
        "O trânsito em NY pode ser congestionado, então sempre saia com antecedência",
      ],
      icon: <FaPlane size={28} className="text-blue-500 mr-4" />,
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {tourismInfoData.map((info, index) => (
        <div key={index} className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
          <div className="flex items-start mb-4">
            {info.icon}
            <h3 className="text-lg font-semibold text-blue-500">{info.title}</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {info.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-6 text-center">
        <a
          href="https://dicasnovayork.com.br/pontos-turisticos-de-nova-york/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-2 px-6 rounded-md text-lg font-bold hover:bg-blue-600"
        >
          Pontos Turísticos
        </a>
      </div>
    </div>
  );
};

export default TourismInfoCard;