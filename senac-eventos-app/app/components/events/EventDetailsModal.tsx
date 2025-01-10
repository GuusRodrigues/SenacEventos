"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "@/app/interfaces/event";
import { createCheckin } from "@/app/services/checkinService";
import useAlert from "@/app/hooks/useAlert";
import useMapsRedirect from "@/app/hooks/useMapsRedirect";

interface EventDetailsProps {
  event: Event;
  isVisible: boolean;
  onClose: () => void;
  onCheckin: () => void;
  hasCheckedIn: boolean;
  loadEvents: () => Promise<void>;
}

export default function EventDetails({
  event,
  isVisible,
  onClose,
  onCheckin,
  hasCheckedIn,
  loadEvents,
}: EventDetailsProps) {
  const [hasCheckedInState, setHasCheckedInState] = useState(hasCheckedIn);
  const { showError, showSuccess } = useAlert();
  const redirectToMaps = useMapsRedirect(event.location || "");

  const formattedDate = event.date.split("-").reverse().join("/");
  const formattedTime = event.time.split(":").slice(0, 2).join(":");

  const handleCheckin = async () => {
    try {
      const storedParticipant = localStorage.getItem("participant");
      if (!storedParticipant) {
        showError("Usuário não encontrado. Faça login novamente.");
        return;
      }

      const participant = JSON.parse(storedParticipant);
      const checkinData = {
        idActivity: event.idActivity,
        idParticipant: participant.idParticipant,
      };

      await createCheckin(checkinData);
      showSuccess("Check-in realizado com sucesso!");
      setHasCheckedInState(true);
      onCheckin();
      await loadEvents();
    } catch {
      showError("Erro: Não foi possível realizar o check-in.");
    }
  };

  useEffect(() => {
    setHasCheckedInState(hasCheckedIn);
  }, [hasCheckedIn]);

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={onClose}
      contentLabel="Detalhes do Evento"
      ariaHideApp={false}
      className="bg-white rounded-lg shadow-lg max-w-5xl w-full mx-auto mt-10 p-8 overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-full max-h-[80vh] overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{event.title}</h2>
        </div>
        <div className="flex items-center mb-6">
          <FaCalendarAlt size={28} className="text-blue-600" />
          <p className="ml-4 text-xl text-blue-600">Data: {formattedDate}</p>
        </div>
        <div className="flex items-center mb-6">
          <FaClock size={28} className="text-blue-600" />
          <p className="ml-4 text-xl text-blue-600">Hora: {formattedTime}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Sobre</h3>
          <p className="text-lg text-gray-600 mt-4">{event.description}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Endereço</h3>
          <div className="flex items-center mt-4">
            <FaMapMarkerAlt size={28} className="text-blue-600 mr-4" />
            <button
              onClick={redirectToMaps}
              className="text-lg text-blue-600 underline hover:text-blue-800"
            >
              {event.location || "Local não especificado"}
            </button>
          </div>
        </div>
        <div className="p-6">
          {hasCheckedInState ? (
            <button
              disabled
              className="w-full bg-gray-400 rounded-lg p-6 text-white text-lg font-bold cursor-not-allowed"
            >
              Check-in realizado
            </button>
          ) : (
            <button
              onClick={handleCheckin}
              className="w-full bg-blue-600 rounded-lg p-6 text-white text-lg font-bold"
            >
              Fazer Check-in
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full mt-4 text-blue-600 text-lg font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}