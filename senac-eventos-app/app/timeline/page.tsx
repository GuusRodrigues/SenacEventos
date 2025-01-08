"use client";
import React from "react";

//components
import CardTimeline from "../components/timeline/cardTimeline/page";

const TimelinePage = () => {
  return (
    <main>
      <header className="flex justify-center bg-blue-50 p-14">
        <h1 className="text-2xl font-bold text-blue-300">Linha do Tempo</h1>
      </header>

      <div className="m-4 flex flex-col gap-6">
        <CardTimeline/>
        <CardTimeline/>
        <CardTimeline/>
      </div>
    </main>
  );
};

export default TimelinePage;
