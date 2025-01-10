import { useCallback } from "react";

const useFormatPhone = () => {
  const formatPhone = useCallback((phone: string): string => {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, ""); // Remove caracteres não numéricos
    const maxLength = 11; // Limita a 11 dígitos

    const limited = cleaned.slice(0, maxLength); // Limita ao tamanho máximo permitido

    // Aplica a máscara de forma progressiva
    if (limited.length === 11) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 3)} ${limited.slice(3, 7)}-${limited.slice(7)}`;
    } else if (limited.length > 6) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 3)} ${limited.slice(3)}`;
    } else if (limited.length > 2) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else {
      return `(${limited}`;
    }
  }, []);

  const handlePhoneChange = useCallback((currentValue: string, previousValue: string): string => {
    const currentCleaned = currentValue.replace(/\D/g, "");
    const previousCleaned = previousValue.replace(/\D/g, "");

    if (currentCleaned.length < previousCleaned.length) {
      return currentCleaned;
    }

    return formatPhone(currentValue);
  }, [formatPhone]);

  return { formatPhone, handlePhoneChange };
};

export default useFormatPhone;