import api, { DEBUG_MODE } from "./api";

interface LoginResponse {
  token: string;
  email: string;
}

export const login = async (email: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/appevento/auth/login", { email });
    const { token, email: userEmail } = response.data;

    // Armazena os dados no localStorage (disponível no navegador)
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);
    }

    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao realizar login:", error);
    }
    throw error;
  }
};
