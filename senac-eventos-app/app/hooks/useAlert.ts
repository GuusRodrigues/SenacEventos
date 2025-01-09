import Swal from "sweetalert2";
import { useCallback } from "react";

const useAlert = () => {
  const showSuccess = useCallback((message: string) => {
    Swal.fire({
      icon: "success",
      title: "Sucesso",
      text: message,
      confirmButtonColor: "#3085d6",
    });
  }, []);

  const showError = useCallback((message: string) => {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: message,
      confirmButtonColor: "#d33",
    });
  }, []);

  return { showSuccess, showError };
};

export default useAlert;