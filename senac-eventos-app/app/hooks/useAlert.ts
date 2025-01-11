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

  const showConfirmation = useCallback(
    (message: string, confirmText: string, cancelText: string) => {
      return Swal.fire({
        title: "Tem certeza?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
      });
    },
    []
  );

  return { showSuccess, showError, showConfirmation };
};

export default useAlert;