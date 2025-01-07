import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Event } from '@/interfaces/event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createCheckin } from '@/services/checkinService';

interface EventDetailsProps {
  event: Event;
  isVisible: boolean;
  onClose: () => void;
  onCheckin: () => void;
  hasCheckedIn: boolean;
  loadEvents: () => Promise<void>;
}

Modal.setAppElement('#__next'); // Definir o elemento root para o modal, como recomendado pela documentação do react-modal.

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isVisible,
  onClose,
  onCheckin,
  hasCheckedIn,
  loadEvents,
}) => {
  const [hasCheckedInState, setHasCheckedInState] = useState(hasCheckedIn);

  const formattedDate = event.date.split('-').reverse().join('/');
  const formattedTime = event.time.split(':').slice(0, 2).join(':');

  const handleCheckin = async () => {
    try {
      const storedParticipant = localStorage.getItem('participant');
      if (!storedParticipant) {
        alert('Erro: Usuário não encontrado. Faça login novamente.');
        return;
      }

      const participant = JSON.parse(storedParticipant);
      const checkinData = {
        idActivity: event.idActivity,
        idParticipant: participant.idParticipant,
      };

      await createCheckin(checkinData);
      alert('Sucesso: Check-in realizado com sucesso!');
      setHasCheckedInState(true);
      onCheckin();
      await loadEvents();
    } catch {
      alert('Erro: Não foi possível realizar o check-in.');
    }
  };

  useEffect(() => {
    setHasCheckedInState(hasCheckedIn);
  }, [hasCheckedIn]);

  return (
    <Modal isOpen={isVisible} onRequestClose={onClose} contentLabel="Event Details" className="modal">
      <div className="flex-1 bg-white p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
        </div>
        <div className="flex items-center mb-4">
          <CalendarTodayIcon sx={{ fontSize: 24, color: '#0056D6' }} />
          <span className="ml-3 text-lg text-blue-600">Data: {formattedDate}</span>
        </div>
        <div className="flex items-center mb-4">
          <AccessTimeIcon sx={{ fontSize: 24, color: '#0056D6' }} />
          <span className="ml-3 text-lg text-blue-600">Hora: {formattedTime}</span>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Sobre</h3>
          <p className="text-lg text-gray-600 mt-2">{event.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Endereço</h3>
          <p className="text-lg text-gray-600 mt-2">{event.location}</p>
        </div>
        {event.speaker && event.speaker.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Palestrantes</h3>
            {event.speaker.map((speaker) => (
              <div key={speaker.idSpeaker} className="mt-3">
                <h4 className="text-lg font-bold text-gray-800">{speaker.name}</h4>
                <p className="text-lg text-gray-600">{speaker.description}</p>
                <p className="text-lg text-gray-500">
                  {speaker.role} - {speaker.company}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between p-4 bg-white">
          {hasCheckedInState ? (
            <button disabled className="bg-gray-400 rounded-lg p-4 mb-4 w-full">
              <span className="text-white text-center text-lg font-bold">Check-in realizado</span>
            </button>
          ) : (
            <button onClick={handleCheckin} className="bg-blue-600 rounded-lg p-4 mb-4 w-full">
              <span className="text-white text-center text-lg font-bold">Fazer Check-in</span>
            </button>
          )}
          <button onClick={onClose} className="text-blue-600 text-center text-lg w-full">
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetails;
