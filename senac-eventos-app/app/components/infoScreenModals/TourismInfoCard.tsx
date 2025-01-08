import React from "react";
import { FaBuilding, FaCalendar, FaMapMarkerAlt, FaLightbulb } from "react-icons/fa";

const TourismInfoCard: React.FC = () => {
  const tourismInfoData = [
    {
      title: "Programação Cultural",
      items: [
        "10 de janeiro: Reunião de integração no Millennium Hotel Broadway Times Square",
        "Visitas técnicas a lojas na 5th Avenue",
        "11 de janeiro: City tour cultural",
      ],
      icon: <FaBuilding size={28} className="text-blue-500 mr-4" />,
    },
    {
      title: "Programação NRF",
      items: [
        "12 de janeiro: NRF das 8h às 17h, incluindo visita guiada das 12h às 14h",
        "13 de janeiro: NRF das 8h às 17h",
        "14 de janeiro: NRF das 8h às 17h",
      ],
      icon: <FaCalendar size={28} className="text-blue-500 mr-4" />,
    },
    {
      title: "Visitas Especiais",
      items: [
        "15 de janeiro: Visita ao Consulado-Geral do Brasil em New York às 11h",
        "Visita à Câmara de Comércio de New York às 15h",
        "16 de janeiro: Visitas técnicas pela manhã",
      ],
      icon: <FaMapMarkerAlt size={28} className="text-blue-500 mr-4" />,
    },
    {
      title: "Dicas Úteis",
      items: [
        "Leve roupas confortáveis e adequadas ao inverno em Nova York",
        "Tenha sempre uma garrafa de água e lanches leves",
        "Mantenha os documentos necessários sempre à mão",
        "Planeje o transporte com antecedência para evitar atrasos",
      ],
      icon: <FaLightbulb size={28} className="text-blue-500 mr-4" />,
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Informações de Turismo</h2>
      {tourismInfoData.map((info, index) => (
        <div key={index} className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
          <div className="flex items-start mb-4">
            {info.icon}
            <h3 className="text-lg font-semibold text-blue-500">{info.title}</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {info.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start space-x-2">
                <FaLightbulb size={16} className="text-blue-500" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TourismInfoCard;
