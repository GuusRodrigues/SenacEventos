"use client";

import React, { useEffect, useState } from "react";
import { getAllParticipants } from "@/app/services/participantService";
import { Participant } from "@/app/interfaces/participant";


interface ParticipantsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
  visible,
  onClose,
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      loadParticipants();
    }
  }, [visible]);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const data: Participant[] = await getAllParticipants();
      setParticipants(data);
    } catch (error) {
      console.error("Erro ao carregar participantes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Participantes</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="ml-4 text-gray-600">Carregando participantes...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {participants.map((participant) => (
              <div
                key={participant.idParticipant}
                className="bg-gray-100 p-4 rounded-lg shadow"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {participant.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Contato: {participant.contact}
                </p>
                <p className="text-sm text-gray-600">
                  Cargo: {participant.position}
                </p>
                <p className="text-sm text-gray-600">
                  Empresa: {participant.companyName || "Não especificada"}
                </p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ParticipantsModal;