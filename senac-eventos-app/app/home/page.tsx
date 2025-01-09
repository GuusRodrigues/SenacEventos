"use client";
import { useState } from "react";
import Image from "next/image";
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
        <Image
          src={imageUrlMarca} // Usando a URL da imagem "marca.png"
          alt="Marca"
          width={150}
          height={150}
          className="sm:w-[200px] sm:h-[200px] object-cover"
        />
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full h-[200px] sm:h-[300px] relative">
          <Image
            src={imageUrlExemplo} // Usando a URL da imagem "exemploInicio.png"
            alt="Exemplo Início"
            layout="fill"
            className="object-cover"
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