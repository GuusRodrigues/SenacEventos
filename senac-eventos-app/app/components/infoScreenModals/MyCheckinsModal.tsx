"use client";

import React, { useEffect, useState } from "react";
import { fetchCheckinsByParticipant } from "@/app/services/checkinService";
import { fetchEventById } from "@/app/services/eventService";
import MyCheckinsCard from "./MyCheckinsCard";
import { Checkin } from "@/app/interfaces/checkin";
import { FaRegSadTear } from "react-icons/fa";

interface MyCheckinsModalProps {
  visible: boolean;
  onClose: () => void;
}

const MyCheckinsModal: React.FC<MyCheckinsModalProps> = ({
  visible,
  onClose,
}) => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventNames, setEventNames] = useState<{ [key: number]: string }>({});

  const loadCheckins = async () => {
    setLoading(true);
    try {
      const storedParticipant = localStorage.getItem("participant");
      if (!storedParticipant) {
        return;
      }
      const participant = JSON.parse(storedParticipant);
      const checkinsData = await fetchCheckinsByParticipant(
        participant.idParticipant
      );
      setCheckins(checkinsData);
    } catch (error) {
      console.error("Erro ao carregar check-ins:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadEventNames = async () => {
    try {
      const events = await Promise.all(
        checkins.map(async (checkin) => {
          try {
            const event = await fetchEventById(checkin.idActivity);
            return { id: checkin.idActivity, title: event.title };
          } catch {
            return { id: checkin.idActivity, title: "Evento não encontrado" };
          }
        })
      );
      const eventsMap = events.reduce((acc, event) => {
        acc[event.id] = event.title;
        return acc;
      }, {} as { [key: number]: string });
      setEventNames(eventsMap);
    } catch (error) {
      console.error("Erro ao carregar os nomes dos eventos:", error);
    }
  };

  useEffect(() => {
    if (visible) {
      loadCheckins();
    }
  }, [visible]);

  useEffect(() => {
    if (checkins.length > 0) {
      loadEventNames();
    }
  }, [checkins]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Meus Check-ins
        </h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-lg text-gray-600 mt-2">Carregando check-ins...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {checkins.length > 0 ? (
              checkins.map((item) => (
                <MyCheckinsCard
                  key={item.idCheckin}
                  eventName={eventNames[item.idActivity] || "Carregando..."}
                  checkinDateTime={item.checkinDateTime}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <FaRegSadTear size={40} className="text-gray-500 mb-4" />
                <p className="text-lg text-gray-700">
                  Você não tem check-ins registrados.
                </p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MyCheckinsModal;