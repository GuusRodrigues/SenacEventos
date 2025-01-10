import { useCallback } from "react";

const useMapsRedirect = (address: string) => {
  const redirectToMaps = useCallback(() => {
    if (!address) {
      console.error("Endereço inválido para redirecionamento.");
      return;
    }
    const url = `geo:0,0?q=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  }, [address]);

  return redirectToMaps;
};

export default useMapsRedirect;