import React, { useState } from 'react';
import TourismInfoCard from './TourismInfoCard';
import HotelInfoCard from './HotelInfoCard';
import FlightInfoCard from './FlightInfoCard';

interface TravelGuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const TravelGuideModal: React.FC<TravelGuideModalProps> = ({ visible, onClose }) => {
  const [currentSubModal, setCurrentSubModal] = useState<'flight' | 'hotel' | 'tourism' | null>(null);

  const openSubModal = (modalType: 'flight' | 'hotel' | 'tourism') => {
    setCurrentSubModal(modalType);
  };

  const closeSubModal = () => {
    setCurrentSubModal(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      {!currentSubModal && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Hospedagem e Transporte</h2>
          <div className="flex justify-around">
            <button
              className="flex flex-col items-center"
              onClick={() => openSubModal('flight')}
            >
              <span className="material-icons text-6xl text-gray-800">flight</span>
              <span className="mt-2 text-lg">Voo</span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => openSubModal('hotel')}
            >
              <span className="material-icons text-6xl text-gray-800">hotel</span>
              <span className="mt-2 text-lg">Hospedagem</span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => openSubModal('tourism')}
            >
              <span className="material-icons text-6xl text-gray-800">directions_car</span>
              <span className="mt-2 text-lg">Turismo</span>
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
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            {currentSubModal === 'flight' && 'Informações sobre Voos'}
            {currentSubModal === 'hotel' && 'Informações sobre Hospedagem'}
            {currentSubModal === 'tourism' && 'Informações sobre Turismo'}
          </h2>
          <div className="overflow-y-auto max-h-96">
            {currentSubModal === 'flight' && <FlightInfoCard />}
            {currentSubModal === 'hotel' && <HotelInfoCard />}
            {currentSubModal === 'tourism' && <TourismInfoCard />}
          </div>
          <button
            onClick={closeSubModal}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md text-lg font-bold"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelGuideModal;
