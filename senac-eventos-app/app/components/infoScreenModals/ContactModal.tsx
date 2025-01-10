"use client";

import React, { useEffect, useState } from "react";
import { getAllParticipants } from "@/app/services/participantService";
import { Participant } from "@/app/interfaces/participant";
import useDisplayContact from "@/app/hooks/useDisplayContact";
import { FaUser, FaWhatsapp, FaBuilding, FaSuitcase } from "react-icons/fa";

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
  const [contacts, setContacts] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { formatFullPhone } = useDisplayContact();

  useEffect(() => {
    if (visible) {
      loadContacts();
    }
  }, [visible]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllParticipants();
      const filteredContacts = data.filter(
        (contact) => contact.postPermission === 1
      );
      setContacts(filteredContacts);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (contact: string) => {
    const cleanedContact = contact.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanedContact}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-black">Contatos dos Coordenadores</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            {contacts.map((contact) => (
              <div
                key={contact.idParticipant}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-700" />
                  <p className="text-base font-bold text-black">{contact.name}</p>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer text-green-600"
                  onClick={() => openWhatsApp(contact.contact)}
                >
                  <FaWhatsapp />
                  <p>{formatFullPhone(contact.contact)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaSuitcase className="text-gray-700" />
                  <p className="text-sm text-gray-600">{contact.position}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-gray-700" />
                  <p className="text-sm text-gray-600">
                    {contact.companyName || "Não especificada"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-4 border-t border-gray-300">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;