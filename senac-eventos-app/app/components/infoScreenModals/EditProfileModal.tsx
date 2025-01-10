/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AreaOfExpertiseDTO } from "@/app/interfaces/areaOfExpertise";
import { Participant } from "@/app/interfaces/participant";
import { getAllAreas } from "@/app/services/areaService";
import { updateParticipant } from "@/app/services/participantService";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import useFormatPhone from "@/app/hooks/useFormatPhone";
import useAlert from "@/app/hooks/useAlert";
import CountrySelect from "@/app/components/CountrySelect";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
}) => {
  const [formData, setFormData] = useState<
    Partial<Participant> & { idArea?: number[] }
  >({});
  const [areas, setAreas] = useState<AreaOfExpertiseDTO[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [countryCode, setCountryCode] = useState("+55");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useAlert();

  const handleBlurContact = () => {
    if (contact.replace(/\D/g, "").length !== 10 && contact.replace(/\D/g, "").length !== 11) {
      showError("O contato deve ter 10 ou 11 números.");
    }
  };

  const applyMask = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length > 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length > 2) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return `(${cleaned}`;
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (visible) {
        try {
          const storedUserData = localStorage.getItem("participant");
          if (storedUserData) {
            const userData: Participant = JSON.parse(storedUserData);
            setFormData(userData);
            const [code, number] = userData.contact?.split(" ") || ["+55", ""];
            setCountryCode(code);
            setContact(applyMask(number));
            const areaIds =
              userData.AreaOfExpertise?.map((area) => area.idArea) || [];
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
    try {
      const { AreaOfExpertise, ...updatedData } = formData;
      updatedData.contact = `${countryCode} ${contact.replace(/\D/g, "")}`;
      updatedData.idArea = selectedAreas;
      await updateParticipant(updatedData as Participant);

      localStorage.setItem(
        "participant",
        JSON.stringify({
          ...updatedData,
          AreaOfExpertise: selectedAreas.map((id) =>
            areas.find((area) => area.idArea === id)
          ),
        })
      );

      showSuccess("Dados salvos com sucesso.");
      onClose();
    } catch (error) {
      showError("Erro ao salvar dados do usuário.");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg h-screen overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Editar Perfil</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
            <p className="ml-4 text-gray-700">Carregando...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full border text-gray-700 border-gray-300 p-2 rounded"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Cargo
              </label>
              <input
                type="text"
                className="w-full border text-gray-700 border-gray-300 p-2 rounded"
                value={formData.position || ""}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
            </div>
            <div className="mb-4 flex gap-2">
              <CountrySelect value={countryCode} onChange={setCountryCode} />
              <input
                type="text"
                className="flex-grow border text-gray-700 border-gray-300 p-2 rounded"
                value={contact}
                onChange={(e) => setContact(applyMask(e.target.value))}
                maxLength={15}
                onBlur={handleBlurContact}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                className="w-full border text-gray-700 border-gray-300 p-2 rounded"
                value={formData.companyName || ""}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Segmento
              </label>
              <MultiSelect
                options={areas.map((area) => ({
                  label: area.name,
                  value: area.idArea,
                }))}
                value={selectedAreas
                  .map((id) => {
                    const area = areas.find((area) => area.idArea === id);
                    return area
                      ? { label: area.name, value: area.idArea }
                      : undefined;
                  })
                  .filter(
                    (area): area is { label: string; value: number } =>
                      area !== undefined
                  )}
                onChange={(selected: { label: string; value: number }[]) =>
                  setSelectedAreas(selected.map((option) => option.value))
                }
                labelledBy="Selecione as Áreas"
                className="text-gray-800"
                overrideStrings={{
                  allItemsAreSelected: "Todos os itens selecionados",
                  clearSearch: "Limpar busca",
                  noOptions: "Nenhuma opção disponível",
                  search: "Pesquisar",
                  selectAll: "Selecionar Todos",
                  selectSomeItems: "Selecione...",
                }}
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-500"
                value={formData.email || ""}
                readOnly
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 mt-10 text-white py-2 rounded-lg font-bold mb-4"
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