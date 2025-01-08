"use client";

import React from "react";
import TabNavigator from "../components/tabNavgator";

const FavoritesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-700">Seus Favoritos</h1>
      <p className="mt-4 text-gray-600">
        Aqui você encontra os eventos que marcou como favoritos.
      </p>
      <TabNavigator /> 

    </div>
  );
};

export default FavoritesPage;