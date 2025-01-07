import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkBorder, CalendarToday, AccessTime, Place } from '@mui/icons-material'; // Importando ícones individualmente
import { Event } from '@/interfaces/event';
import EventDetails from './eventDetailsModal';
import { Button, Card, Typography, Box } from '@mui/material';

interface EventCardProps {
  event: Event;
  isFavorite: boolean;
  onFavoriteSuccess?: (event: Event) => void;
  onRemoveFavorite?: () => void;
  onCheckin?: (event: Event) => void;
  loadEvents: () => Promise<void>;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  isFavorite,
  onFavoriteSuccess,
  onRemoveFavorite,
  onCheckin,
  loadEvents,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const formattedDate = event.date.split('-').reverse().join('/');
  const formattedTime = event.time.split(':').slice(0, 2).join(':');

  useEffect(() => {
    const checkIfCheckedIn = async () => {
      try {
        const storedParticipant = localStorage.getItem('participant');
        if (!storedParticipant) {
          setHasCheckedIn(false);
          return;
        }

        const participant = JSON.parse(storedParticipant);
        const isCheckedIn = event.checkins?.some(
          (checkin) => checkin.participant?.idParticipant === participant.idParticipant
        );

        setHasCheckedIn(!!isCheckedIn);
      } catch {
        setHasCheckedIn(false);
      }
    };

    checkIfCheckedIn();
  }, [event.checkins]);

  const handleFavorite = () => {
    if (onFavoriteSuccess) {
      onFavoriteSuccess(event);
    }
  };

  const handleRemoveFavorite = () => {
    if (onRemoveFavorite) {
      onRemoveFavorite();
    }
  };

  const handleCheckin = () => {
    if (onCheckin) {
      onCheckin(event);
    }
    setModalVisible(false);
  };

  return (
    <>
      <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            {event.title}
          </Typography>
          {isFavorite ? (
            <Button onClick={handleRemoveFavorite}>
              <Bookmark sx={{ color: '#0056D6' }} />
            </Button>
          ) : (
            <Button onClick={handleFavorite}>
              <BookmarkBorder sx={{ color: '#666' }} />
            </Button>
          )}
        </Box>
        <Box display="flex" mb={2}>
          <Box display="flex" alignItems="center" mr={4}>
            <CalendarToday sx={{ color: '#0056D6' }} />
            <Typography variant="body2" sx={{ ml: 1, color: '#0056D6' }}>
              {formattedDate}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <AccessTime sx={{ color: '#0056D6' }} />
            <Typography variant="body2" sx={{ ml: 1, color: '#0056D6' }}>
              {formattedTime}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Sobre
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }} mb={3}>
          {event.description}
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Place sx={{ color: '#666' }} />
          <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
            {event.location}
          </Typography>
        </Box>
        {event.speaker && event.speaker.length > 0 && (
          <>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Palestrantes
            </Typography>
            {event.speaker.map((speaker) => (
              <Box key={speaker.idSpeaker} mb={2}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {speaker.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {speaker.description}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {speaker.role} - {speaker.company}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Card>

      <EventDetails
        event={event}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCheckin={handleCheckin}
        hasCheckedIn={hasCheckedIn}
        loadEvents={loadEvents}
      />
    </>
  );
};

export default EventCard;
