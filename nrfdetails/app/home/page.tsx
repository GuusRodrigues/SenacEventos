"use client";
import { useState } from 'react';
import Image from 'next/image';
import DateScroll from '../components/dateScroll/dateScroll';
import EventList from '../components/events/EventList';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <>
      <div className="w-full bg-blue-500 flex items-center justify-center py-20">
        <Image src="/images/marca.png" alt="Marca" width={200} height={200} />
      </div>

      <div className="mx-auto my-4">
        <Image src="/images/exemploInicio.png" alt="Exemplo Início" width={500} height={300} />
      </div>

      <DateScroll selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <EventList selectedDate={selectedDate} />
    </>
  );
}