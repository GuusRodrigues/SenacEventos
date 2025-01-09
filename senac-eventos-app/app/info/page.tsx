"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaUsers,
  FaGlobe,
  FaCheckCircle,
  FaMap,
} from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import ContactModal from "../components/infoScreenModals/ContactModal";
import ParticipantsModal from "../components/infoScreenModals/ParticipantsModal";
import TravelGuideModal from "../components/infoScreenModals/TravelGuideModal";
import TranslatorModal from "../components/infoScreenModals/TranslatorModal";
import EditProfileModal from "../components/infoScreenModals/EditProfileModal";
import MyCheckinsModal from "../components/infoScreenModals/MyCheckinsModal";
import TabNavigator from "../components/tabNavgator";

const InfoScreen: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [modalParticipantsVisible, setModalParticipantsVisible] = useState(false);
  const [modalTravelGuideVisible, setModalTravelGuideVisible] = useState(false);
  const [modalTranslatorVisible, setModalTranslatorVisible] = useState(false);
  const [modalMyCheckinsVisible, setModalMyCheckinsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nome: "Carregando nome...",
    email: "Carregando e-mail...",
    empresa: "",
    position: "",
    contact: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedParticipant = localStorage.getItem("participant");
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setFormData({
            nome: participant.name || "Nome não disponível",
            email: participant.email || "",
            empresa: participant.companyName || "",
            position: participant.position || "",
            contact: participant.contact || "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-black">Informações</h1>
        <hr className="mt-4 border-gray-300" />
      </div>

      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-black">{formData.nome}</p>
        <p className="text-sm text-gray-500">{formData.email}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold text-black mb-2">Minha Conta</h2>
        <button
          onClick={() => setModalVisible(true)}
          className="flex items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <div className="flex items-center">
            <FaUser size={20} className="text-blue-500" />
            <span className="ml-2 text-black">Editar Perfil</span>
          </div>
          <IoChevronForward size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold text-black mb-2">Central de Atendimento</h2>
        <button
          onClick={() => setModalContactVisible(true)}
          className="flex items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <div className="flex items-center">
            <FaPhone size={20} className="text-blue-500" />
            <span className="ml-2 text-black">Contatos dos Coordenadores</span>
          </div>
          <IoChevronForward size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => setModalParticipantsVisible(true)}
          className="flex items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <div className="flex items-center">
            <FaUsers size={20} className="text-blue-500" />
            <span className="ml-2 text-black">Participantes</span>
          </div>
          <IoChevronForward size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => setModalTranslatorVisible(true)}
          className="flex items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <div className="flex items-center">
            <FaGlobe size={20} className="text-blue-500" />
            <span className="ml-2 text-black">Tradutor</span>
          </div>
          <IoChevronForward size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => setModalMyCheckinsVisible(true)}
          className="flex items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <div className="flex items-center">
            <FaCheckCircle size={20} className="text-blue-500" />
            <span className="ml-2 text-black">Meus Check-ins</span>
          </div>
          <IoChevronForward size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => setModalTravelGuideVisible(true)}
          className="flex items-center justify-between w-full py-2"
        >
          <div className="flex items-center">
            <FaMap size={20} className="text-blue-500" />
            <span className="ml-2 text-black">Guia de Viagem</span>
          </div>
          <IoChevronForward size={20} className="text-gray-400" />
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="border border-red-500 bg-transparent p-4 rounded-lg w-full text-center text-red-500 font-bold"
      >
        Sair da Conta
      </button>

      <ContactModal visible={modalContactVisible} onClose={() => setModalContactVisible(false)} />
      <ParticipantsModal visible={modalParticipantsVisible} onClose={() => setModalParticipantsVisible(false)} />
      <TranslatorModal visible={modalTranslatorVisible} onClose={() => setModalTranslatorVisible(false)} />
      <TravelGuideModal visible={modalTravelGuideVisible} onClose={() => setModalTravelGuideVisible(false)} />
      <EditProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <MyCheckinsModal visible={modalMyCheckinsVisible} onClose={() => setModalMyCheckinsVisible(false)} />
      <TabNavigator />
    </div>
  );
};

export default InfoScreen;