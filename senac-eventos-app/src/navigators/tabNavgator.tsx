import React from "react";
import { useRouter } from "next/router";
import { FaHome, FaBookmark, FaNetworkWired, FaInfoCircle } from "react-icons/fa";
import HomeScreen from "@/pages/home";
import PostCard from "@/pages/PostScreen";
import InfoScreen from "@/pages/InfoScreen";
import FavoriteEventsScreen from "@/pages/FavoritesEventsScreen";

const TabNavigator = () => {
  const router = useRouter();
  const { pathname } = router;

  const renderIcon = (routeName, focused) => {
    switch (routeName) {
      case "Início":
        return focused ? <FaHome className="text-blue-700" /> : <FaHome className="text-blue-300" />;
      case "Favoritos":
        return focused ? <FaBookmark className="text-blue-700" /> : <FaBookmark className="text-blue-300" />;
      case "Linha do Tempo":
        return focused ? <FaNetworkWired className="text-blue-700" /> : <FaNetworkWired className="text-blue-300" />;
      case "Informações":
        return focused ? <FaInfoCircle className="text-blue-700" /> : <FaInfoCircle className="text-blue-300" />;
      default:
        return <FaInfoCircle className="text-blue-300" />;
    }
  };

  const renderScreen = () => {
    switch (pathname) {
      case "/inicio":
        return <HomeScreen />;
      case "/favoritos":
        return <FavoriteEventsScreen />;
      case "/linha-do-tempo":
        return <PostCard />;
      case "/informacoes":
        return <InfoScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{renderScreen()}</div>
      <div className="flex justify-around bg-white py-4 border-t border-gray-200">
        {["Início", "Favoritos", "Linha do Tempo", "Informações"].map((routeName) => (
          <button
            key={routeName}
            className="flex flex-col items-center"
            onClick={() => router.push(`/${routeName.toLowerCase().replace(" ", "-")}`)}
          >
            {renderIcon(routeName, pathname === `/${routeName.toLowerCase().replace(" ", "-")}`)}
            <span className={`text-xs ${pathname === `/${routeName.toLowerCase().replace(" ", "-")}` ? "text-blue-700" : "text-blue-300"}`}>
              {routeName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigator;


