"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "../services/authService";
import { getParticipantByEmail } from "../services/participantService";
import RegisterParticipantScreen from "../components/registerParticipant";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const handleLogin = async (emailToLogin?: string) => {
    const emailToUse = emailToLogin || email.trim();
    if (!emailToUse) {
      setEmailError(true);
      return;
    }
    setLoading(true);
    setEmailError(false);
    setLoginError(false);

    try {
      const response = await login(emailToUse);
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);

      const participant = await getParticipantByEmail(response.email);
      localStorage.setItem("participant", JSON.stringify(participant));

      router.push("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  const openRegisterModal = () => setIsModalVisible(true);
  const closeRegisterModal = () => setIsModalVisible(false);

  const handleRegisterSuccess = (registeredEmail: string) => {
    setIsModalVisible(false);
    handleLogin(registeredEmail);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center w-full max-w-md p-4">
        <div className="mb-10">
          <Image
            src={"https://missaonrf25.pe.senac.br/appevento/uploads/Marca_NRF_4_1.png"}
            alt="Marca"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="w-full mb-6">
          <label className="block mb-2 text-gray-700 font-bold">E-mail</label>
          <input
            type="email"
            className={`w-full px-3 text-gray-600 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              emailError
                ? "border-red-500 focus:ring-red-200"
                : "border-blue-500 focus:ring-blue-200"
            }`}
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">Email é obrigatório.</p>
          )}
        </div>
        <button
          className="w-full py-3 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center"
          onClick={() => handleLogin()}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="w-5 h-5 mr-2 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Entrar"
          )}
        </button>
        {loginError && (
          <p className="mb-4 text-sm text-red-500">
            Falha no login ou na busca de informações do participante.
          </p>
        )}
        <button
          className="text-blue-600 hover:text-blue-800 font-semibold"
          onClick={openRegisterModal}
        >
          Não possui uma conta?{" "}
          <span className="font-bold text-blue-700">Cadastre-se</span>
        </button>
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={closeRegisterModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <RegisterParticipantScreen
                onClose={closeRegisterModal}
                onRegisterSuccess={handleRegisterSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;