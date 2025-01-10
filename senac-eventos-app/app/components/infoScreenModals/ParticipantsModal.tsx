"use client";

import React from "react";

interface ParticipantsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
  visible,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold text-black">Participantes</h2>
        <button
          onClick={() => window.open("/admins/Catálogo NRF.pdf", "_blank")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Catálogo de Participantes
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black py-2 px-4 rounded-lg w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ParticipantsModal;