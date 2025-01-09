"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { AreaOfExpertiseDTO } from "../interfaces/areaOfExpertise";
import { CreateParticipant } from "../interfaces/participant";
import { createParticipant } from "../services/participantService";
import { getAllAreas } from "../services/areaService";

interface RegisterParticipantScreenProps {
  onClose: () => void;
  onRegisterSuccess: (email: string) => void;
}

const RegisterParticipantScreen: React.FC<RegisterParticipantScreenProps> = ({
  onClose,
  onRegisterSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [contact, setContact] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [areas, setAreas] = useState<AreaOfExpertiseDTO[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [areasLoading, setAreasLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchAreasOfExpertise();
  }, []);

  const fetchAreasOfExpertise = async () => {
    try {
      const data = await getAllAreas();
      setAreas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAreasLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPosition("");
    setContact("");
    setCompanyName("");
    setSelectedAreas([]);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!position.trim()) newErrors.position = true;
    if (!contact.trim()) newErrors.contact = true;
    if (selectedAreas.length === 0) newErrors.selectedAreas = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const sanitizedContact = contact.replace(/[^0-9]/g, "");

    const participantData: CreateParticipant = {
      name,
      email,
      position,
      contact: sanitizedContact,
      companyName: companyName || undefined,
      idArea: selectedAreas,
      postPermission: 0,
    };

    setLoading(true);
    try {
      await createParticipant(participantData);
      onRegisterSuccess(email);
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (areasLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="loader"></div>
        <p className="mt-4 text-lg text-gray-600">
          Carregando áreas de especialização...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 mt-4">
      <h1 className="text-2xl font-bold text-blue-900 text-center mb-4">
        Cadastro de Participante
      </h1>
      <div className="mb-4">
        <input
          className={`w-full p-3 rounded-lg border text-gray-600 ${
            errors.name ? "border-red-500" : "border-blue-300"
          }`}
          placeholder="Nome*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Nome é obrigatório.</p>
        )}
      </div>
      <div className="mb-4">
        <input
          className={`w-full p-3 rounded-lg border text-gray-600 ${
            errors.email ? "border-red-500" : "border-blue-300"
          }`}
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">Email é obrigatório.</p>
        )}
      </div>
      <div className="mb-4">
        <input
          className={`w-full p-3 rounded-lg text-gray-600 border ${
            errors.position ? "border-red-500" : "border-blue-300"
          }`}
          placeholder="Cargo*"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        {errors.position && (
          <p className="text-red-500 text-sm mt-1">Cargo é obrigatório.</p>
        )}
      </div>
      <div className="mb-4">
        <input
          className={`w-full p-3 rounded-lg border text-gray-600 ${
            errors.contact ? "border-red-500" : "border-blue-300"
          }`}
          placeholder="Contato*"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          type="tel"
        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">Contato é obrigatório.</p>
        )}
      </div>
      <div className="mb-4">
        <input
          className="w-full p-3 rounded-lg border text-gray-600 border-blue-300"
          placeholder="Nome da Empresa (Opcional)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold text-blue-900 mb-2">
          Segmento*
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
        />
        {errors.selectedAreas && (
          <p className="text-red-500 text-sm mt-1">
            Selecione pelo menos uma área.
          </p>
        )}
      </div>
      <button
        className="w-full bg-blue-700 text-white p-3 rounded-lg mb-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <div className="loader"></div> : "Cadastrar"}
      </button>
      <button
        className="w-full text-blue-700 font-bold p-3 rounded-lg"
        onClick={handleClose}
      >
        Fechar
      </button>
    </div>
  );
};

export default RegisterParticipantScreen;