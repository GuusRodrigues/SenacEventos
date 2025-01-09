"use client";
import { useState } from "react";
import DateScroll from "../components/dateScroll/dateScroll";
import EventList from "../components/events/EventList";
import TabNavigator from "../components/tabNavgator";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");

  const imageUrlExemplo = "https://missaonrf25.pe.senac.br/appevento/uploads/exemploInicio.png";
  const imageUrlMarca = "https://missaonrf25.pe.senac.br/appevento/uploads/marca.png";

  return (
    <>
      <div className="w-full bg-blue-500 flex items-center justify-center py-10 sm:py-20">
        <img
          src={imageUrlMarca}
          alt="Marca"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full sm:w-[300px] h-[200px] sm:h-[300px] relative">
          <img
            src={imageUrlExemplo} // Usando a URL da imagem "exemploInicio.png"
            alt="Exemplo Início"
            className="object-cover w-full h-full"
          />
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