"use client";

import React, { useEffect, useState } from "react";
import { getAllParticipants } from "@/app/services/participantService";
import { Participant } from "@/app/interfaces/participant";
import useDisplayContact from "@/app/hooks/useDisplayContact";
import { FaUser, FaWhatsapp, FaBuilding, FaSuitcase } from "react-icons/fa";


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
  const { formatFullPhone } = useDisplayContact();

  useEffect(() => {
    if (visible) {
      loadParticipants();
    }
  }, [visible]);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const data: Participant[] = await getAllParticipants();
      const filteredParticipants = data.filter(
        (participant) => participant.postPermission === 0
      );
      setParticipants(filteredParticipants);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (contact: string) => {
    const cleanedContact = contact.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanedContact}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800">Participantes</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            participants.map((participant) => (
              <div
                key={participant.idParticipant}
                className="bg-gray-100 p-4 rounded-lg shadow mb-4 flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    {participant.name}
                  </h3>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer text-green-600"
                  onClick={() => openWhatsApp(participant.contact)}
                >
                  <FaWhatsapp />
                  <p>{formatFullPhone(participant.contact)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaSuitcase className="text-gray-700" />
                  <p className="text-sm text-gray-600">
                    Cargo: {participant.position}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-gray-700" />
                  <p className="text-sm text-gray-600">
                    Empresa: {participant.companyName || "Não especificada"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-300">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParticipantsModal;