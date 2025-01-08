"use client";

import { AreaOfExpertiseDTO } from "@/app/interfaces/areaOfExpertise";
import { Participant } from "@/app/interfaces/participant";
import { getAllAreas } from "@/app/services/areaService";
import { updateParticipant } from "@/app/services/participantService";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<Participant> & { idArea?: number[] }>({});
  const [areas, setAreas] = useState<AreaOfExpertiseDTO[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (visible) {
        try {
          const storedUserData = localStorage.getItem("participant");
          if (storedUserData) {
            const userData: Participant = JSON.parse(storedUserData);
            setFormData(userData);
            const areaIds = userData.AreaOfExpertise?.map((area) => area.idArea) || [];
            setSelectedAreas(areaIds);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    const loadAreas = async () => {
      try {
        const areasData = await getAllAreas();
        setAreas(areasData);
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    };

    loadUserData();
    loadAreas();
  }, [visible]);

  const handleInputChange = (field: keyof Participant, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Prepara os dados para salvar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { AreaOfExpertise, ...updatedData } = formData;
    updatedData.idArea = selectedAreas;

    try {
      await updateParticipant(updatedData as Participant);
      // Atualiza os dados no localStorage
      localStorage.setItem(
        "participant",
        JSON.stringify({
          ...updatedData,
          AreaOfExpertise: selectedAreas.map((id) =>
            areas.find((area) => area.idArea === id)
          ),
        })
      );
      onClose();
    } catch (error) {
      console.error("Erro ao salvar dados do usuário:", error);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Editar Perfil</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
            <p className="ml-4 text-gray-700">Carregando...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Cargo</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.position || ""}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Contato</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.contact || ""}
                onChange={(e) => handleInputChange("contact", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Empresa</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.companyName || ""}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Segmento</label>
              <MultiSelect
                options={areas.map((area) => ({
                  label: area.name,
                  value: area.idArea,
                }))}
                value={selectedAreas.map((id) => {
                  const area = areas.find((area) => area.idArea === id);
                  return area ? { label: area.name, value: area.idArea } : undefined;
                }).filter((area): area is { label: string; value: number } => area !== undefined)}
                onChange={(selected: { label: string; value: number }[]) =>
                  setSelectedAreas(selected.map((option) => option.value))
                }
                labelledBy="Selecione as Áreas"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-500"
                value={formData.email || ""}
                readOnly
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold mb-4"
            >
              Salvar
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-300 text-black py-2 rounded-lg font-bold"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;