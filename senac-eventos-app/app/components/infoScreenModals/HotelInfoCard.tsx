import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDumbbell, 
  faUtensils, 
  faGlobe, 
  faChild, 
  faWifi, 
  faBuilding 
} from '@fortawesome/free-solid-svg-icons';

const HotelInfoCard = () => {

  const hotelInfo = {
    hotelName: "Millennium Hotel Broadway Times Square",
    address: "145 W 44th St, New York, NY 10036, United States",
    checkIn: "14h00",
    checkOut: "12h00",
    services: [
      { name: "Academia", icon: faDumbbell },
      { name: "Restaurante e Bar", icon: faUtensils },
      { name: "Equipe Multilíngue", icon: faGlobe },
      { name: "Programa Infantil 'Ask Alfred'", icon: faChild },
      { name: "Wi-Fi Cortesia", icon: faWifi },
      { name: "Instalações para Reuniões e Eventos", icon: faBuilding },

    ],
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-blue-500">{hotelInfo.hotelName}</h1>
        <p className="text-gray-700">{hotelInfo.address}</p>
        <p className="text-gray-700 mt-2">
          Check-in: <span className="text-blue-500">{hotelInfo.checkIn}</span> | Check-out: <span className="text-blue-500">{hotelInfo.checkOut}</span>
        </p>
      </div>

      {/* Services */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-blue-600 mb-4 text-center">Serviços Incluídos:</h2>
        <div className="flex flex-wrap justify-center">
          {hotelInfo.services.map((service, index) => (
            <div
              key={index}
              className="w-1/2 p-3 flex justify-center"
            >
              <div className="bg-white aspect-square flex flex-col justify-center items-center rounded-md shadow-sm border border-gray-200 p-4">
                <FontAwesomeIcon icon={service.icon} size="2x" className="text-blue-500" />
                <p className="text-center text-blue-500 font-medium mt-2">{service.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelInfoCard;
