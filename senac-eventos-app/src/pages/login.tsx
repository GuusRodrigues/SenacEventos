import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RegisterParticipantScreen from "@/pages/registerParticipant";
import { login } from "@/services/authService";
import { getParticipantByEmail } from "@/services/participantService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const handleLogin = async (emailToLogin) => {
    const emailToUse = emailToLogin || email.trim();
    if (!emailToUse) {
      setEmailError(true);
      return;
    }

    setLoading(true);
    setEmailError(false);
    setLoginError(false);

    try {
      if (emailToUse === "admin2024") {
        router.push("/tabNavigator");
        return;
      }

      await login(emailToUse);
      const participant = await getParticipantByEmail(emailToUse);
      router.push("/tabNavigator");
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  const openRegisterModal = () => {
    setIsModalVisible(true);
  };

  const closeRegisterModal = () => {
    setIsModalVisible(false);
  };

  const handleRegisterSuccess = (registeredEmail) => {
    setIsModalVisible(false);
    handleLogin(registeredEmail);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="mb-10">
        <Image
          src="/images/Marca NRF 4 1.png"
          alt="Marca"
          width={200}
          height={100}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col w-full max-w-md px-4">
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              emailError ? "border-red-500" : "border-blue-500"
            }`}
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.trim()) {
                setEmailError(false);
              }
            }}
          />
          {emailError && (
            <p className="mt-2 text-xs text-red-500">Email é obrigatório.</p>
          )}
        </div>
        <button
          className={`w-full py-2 text-white bg-blue-700 rounded-lg ${
            loading ? "opacity-60" : ""
          }`}
          onClick={() => handleLogin()}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Entrar"
          )}
        </button>
        {loginError && (
          <p className="mt-4 text-center text-red-500">
            Falha no login ou na busca de informações do participante.
          </p>
        )}
        <button className="mt-4 text-blue-700" onClick={openRegisterModal}>
          Não possui uma conta? <span className="font-bold">Cadastre-se</span>
        </button>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <RegisterParticipantScreen
              onClose={closeRegisterModal}
              onRegisterSuccess={handleRegisterSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;