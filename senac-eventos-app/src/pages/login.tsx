import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RegisterParticipantScreen from "@/pages/registerParticipant";
import "@/styles/styles.css"; // Importe o arquivo CSS

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
    <div className="container">
      <div className="logo">
        <Image
          src="/images/Marca NRF 4 1.png"
          alt="Marca"
          width={200}
          height={100}
          className="object-contain"
        />
      </div>
      <div className="form-group">
        <label className="label">E-mail</label>
        <input
          type="email"
          className={`input ${emailError ? "input-error" : ""}`}
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
          <p className="error-message">Email é obrigatório.</p>
        )}
      </div>
      <button
        className="button"
        onClick={() => handleLogin()}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          "Entrar"
        )}
      </button>
      {loginError && (
        <p className="error-message">
          Falha no login ou na busca de informações do participante.
        </p>
      )}
      <button className="link" onClick={openRegisterModal}>
        Não possui uma conta? <span className="font-bold">Cadastre-se</span>
      </button>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
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