import useFormatPhone from '@/app/hooks/useFormatPhone';
import { Participant } from '@/app/interfaces/participant';
import { getAllParticipants } from '@/app/services/participantService';
import React, { useEffect, useState } from 'react';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
  const { formatPhone } = useFormatPhone();
  const [contacts, setContacts] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      loadContacts();
    }
  }, [visible]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllParticipants();
      const filteredContacts = data.filter((contact) => contact.postPermission === 1);
      setContacts(filteredContacts);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-black">Contatos dos Coordenadores</h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {contacts.map((contact) => (
              <div key={contact.idParticipant} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
                <p className="text-base font-bold text-black">{contact.name}</p>
                <p className="text-sm text-gray-600">Contato: {formatPhone(contact.contact)}</p>
                <p className="text-sm text-gray-600">Cargo: {contact.position}</p>
                <p className="text-sm text-gray-600">Empresa: {contact.companyName}</p>
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white text-lg font-bold py-4 hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
