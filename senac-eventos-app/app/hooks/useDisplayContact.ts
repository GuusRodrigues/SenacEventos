import { useCallback } from "react";
import useFormatPhone from "@/app/hooks/useFormatPhone";

const useDisplayContact = () => {
  const { formatPhone } = useFormatPhone();

  const formatFullPhone = useCallback((contact: string) => {
    const cleaned = contact.replace(/\D/g, ""); 

    if (cleaned.length < 12) return contact; 

    const countryCode = `+${cleaned.slice(0, 2)}`; 
    const localNumber = cleaned.slice(2); 

    const formatted = formatPhone(localNumber); 
    return `${countryCode} ${formatted}`; 
  }, [formatPhone]);

  return {
    formatFullPhone,
  };
};

export default useDisplayContact;