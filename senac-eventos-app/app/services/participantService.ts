import { CreateParticipant, Participant } from "../interfaces/participant";
import api, { DEBUG_MODE } from "./api";

export const getParticipantByEmail = async (email: string): Promise<Participant> => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await api.get<Participant>(`/appevento/participants/email/${encodedEmail}`);
    const participant: Participant = response.data;

    // Armazena os dados no localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("participant", JSON.stringify(participant));
      const storedParticipant = localStorage.getItem("participant");
      if (DEBUG_MODE) {
        console.log("Armazenado no localStorage:", JSON.parse(storedParticipant || "{}"));
      }
    }

    return participant;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar participante por e-mail:", error);
    }
    throw error;
  }
};

export const getAllParticipants = async (): Promise<Participant[]> => {
  try {
    const response = await api.get<Participant[]>("/appevento/participants");
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao listar todos os participantes:", error);
    }
    throw error;
  }
};

export const updateParticipant = async (data: Participant): Promise<void> => {
  try {
    const { idParticipant, ...updateData } = data;

    if (!idParticipant) {
      throw new Error("O ID do participante é obrigatório para a atualização.");
    }

    await api.put(`/appevento/participants/${idParticipant}`, updateData);

    if (DEBUG_MODE) {
      console.log("Participante atualizado com sucesso:", data);
    }
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao atualizar participante:", error);
    }
    throw error;
  }
};

export const createParticipant = async (data: CreateParticipant): Promise<void> => {
    try {
      const response = await api.post("/appevento/participants", data);
      
      if (DEBUG_MODE) {
        console.log("Participante criado com sucesso:", response.data);  // Exemplo de uso do response
      }
  
      if (response.status === 201) {
      }
    } catch (error) {
      if (DEBUG_MODE) {
        console.error("Erro ao criar participante:", error);
      }
      throw error;
    }
  };
  
