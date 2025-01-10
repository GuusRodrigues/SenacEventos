"use client";

import React, { useState } from "react";
import { MdFlight, MdHotel, MdDirectionsCar } from "react-icons/md";
import TourismInfoCard from "./TourismInfoCard";
import HotelInfoCard from "./HotelInfoCard";
import FlightInfoCard from "./FlightInfoCard";


interface TravelGuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const TravelGuideModal: React.FC<TravelGuideModalProps> = ({
  visible,
  onClose,
}) => {
  const [currentSubModal, setCurrentSubModal] = useState<"flight" | "hotel" | "tourism" | null>(
    null
  );

  const openSubModal = (modalType: "flight" | "hotel" | "tourism") => {

    setCurrentSubModal(modalType);
  };

  const closeSubModal = () => {
    setCurrentSubModal(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {!currentSubModal && (
        <div className="bg-white rounded-lg shadow-lg justify-end p-6 w-full max-w-2xl h-[40vh] flex flex-col overflow-hidden">
          <h2 className="text-2xl text-gray-800 font-bold text-center mb-6">
            Hospedagem e Transporte
          </h2>
          <div className="flex justify-around">
            <button
              className="flex flex-col items-center"
              onClick={() => openSubModal("flight")}
            >
              <MdFlight className="text-6xl text-gray-800" />
              <span className="mt-2 text-gray-800 text-lg">Voo</span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => openSubModal("hotel")}
            >
              <MdHotel className="text-6xl text-gray-800" />
              <span className="mt-2 text-gray-800 text-lg">Hospedagem</span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => openSubModal("tourism")}
            >
              <MdDirectionsCar className="text-6xl text-gray-800" />
              <span className="mt-2 text-gray-800 text-lg">Turismo</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md text-lg font-bold"
          >
            Fechar
          </button>
        </div>
      )}

      {currentSubModal && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl h-[90vh] flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {currentSubModal === "flight" && "Informações sobre Voos"}
            {currentSubModal === "hotel" && "Informações sobre Hospedagem"}
            {currentSubModal === "tourism" && "Informações sobre Turismo"}
          </h2>
          <div className="overflow-y-auto max-h-[90vh]">
            {currentSubModal === "flight" && <FlightInfoCard />}
            {currentSubModal === "hotel" && <HotelInfoCard />}
            {currentSubModal === "tourism" && <TourismInfoCard />}
          </div>
          <div className="p-4 border-t border-gray-300">
          <button
            onClick={closeSubModal}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>
        </div>
      )}
    </div>

  );
};

export default TravelGuideModal;