"use client";

import React from "react";
import TabNavigator from "../components/tabNavgator";

const TimelinePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-700">Linha do Tempo</h1>
      <p className="mt-4 text-gray-600">
        Confira as atualizações e os destaques dos eventos mais recentes.
      </p>
      <TabNavigator /> 

    </div>
  );
};

export default TimelinePage;