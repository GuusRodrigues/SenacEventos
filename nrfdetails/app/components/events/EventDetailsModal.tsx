"use client"
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "@/app/interfaces/event";
import { createCheckin } from "@/app/services/checkinService";

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

  const formattedDate = event.date.split("-").reverse().join("/");
  const formattedTime = event.time.split(":").slice(0, 2).join(":");

  const handleCheckin = async () => {
    try {
      const storedParticipant = localStorage.getItem("participant");
      if (!storedParticipant) {
        alert("Usuário não encontrado. Faça login novamente.");
        return;
      }

      const participant = JSON.parse(storedParticipant);
      const checkinData = {
        idActivity: event.idActivity,
        idParticipant: participant.idParticipant,
      };

      await createCheckin(checkinData);
      alert("Check-in realizado com sucesso!");
      setHasCheckedInState(true);
      onCheckin();
      await loadEvents();
    } catch (error) {
      console.log(error)
      alert("Erro: Não foi possível realizar o check-in.");
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
      className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10 p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
        </div>
        <div className="flex items-center mb-4">
          <FaCalendarAlt size={24} color="#0056D6" />
          <p className="ml-3 text-lg text-blue-600">Data: {formattedDate}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaClock size={24} color="#0056D6" />
          <p className="ml-3 text-lg text-blue-600">Hora: {formattedTime}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Sobre</h3>
          <p className="text-lg text-gray-600 mt-2">{event.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Endereço</h3>
          <p className="text-lg text-gray-600 mt-2">{event.location}</p>
        </div>
        {event.speaker && event.speaker.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Palestrantes</h3>
            {event.speaker.map((speaker) => (
              <div key={speaker.idSpeaker} className="mt-3">
                <p className="text-lg font-bold text-gray-800">{speaker.name}</p>
                <p className="text-lg text-gray-600">{speaker.description}</p>
                <p className="text-lg text-gray-500">
                  {speaker.role} - {speaker.company}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="p-4">
          {hasCheckedInState ? (
            <button
              disabled
              className="w-full bg-gray-400 rounded-lg p-4 text-white text-lg font-bold cursor-not-allowed"
            >
              Check-in realizado
            </button>
          ) : (
            <button
              onClick={handleCheckin}
              className="w-full bg-blue-600 rounded-lg p-4 text-white text-lg font-bold"
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