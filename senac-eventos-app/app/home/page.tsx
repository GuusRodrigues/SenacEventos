"use client";
import { useState } from "react";
import EventList from "../components/events/EventList";
import TabNavigator from "../components/tabNavgator";
import DateScroll from "../components/dateScroll/dateScroll";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");

  const imageUrlExemplo = "https://missaonrf25.pe.senac.br/appevento/uploads/exemploInicio.png";
  const imageUrlMarca = "https://missaonrf25.pe.senac.br/appevento/uploads/marca.png";

  return (
    <>
      <div className="w-full bg-blue-500 flex items-center justify-center py-5 sm:py-20">
        <img
          src={imageUrlMarca}
          alt="Marca"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="w-full flex justify-center">
        <div className="relative">
          <a href="https://nrfbigshow.nrf.com/">
          <img
            src={imageUrlExemplo} // Usando a URL da imagem "exemploInicio.png"
            alt="Exemplo Início"
            className="w-auto h-auto"
          />
          </a>
        </div>
      </div>


      <div className="scrollbar-hide">
        <DateScroll
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="px-4 scrollbar-hide">
        <EventList selectedDate={selectedDate} />
      </div>

      <TabNavigator />
   </>
  );
}