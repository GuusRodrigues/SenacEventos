"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaBookmark, FaNetworkWired, FaInfoCircle } from "react-icons/fa";

const TabNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  const renderIcon = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case "Início":
        return focused ? <FaHome className="text-blue-700" size={24} /> : <FaHome className="text-blue-300" size={24} />;
      case "Favoritos":
        return focused ? <FaBookmark className="text-blue-700" size={24} /> : <FaBookmark className="text-blue-300" size={24} />;
      case "Linha do Tempo":
        return focused ? <FaNetworkWired className="text-blue-700" size={24} /> : <FaNetworkWired className="text-blue-300" size={24} />;
      case "Informações":
        return focused ? <FaInfoCircle className="text-blue-700" size={24} /> : <FaInfoCircle className="text-blue-300" size={24} />;
      default:
        return <FaInfoCircle className="text-blue-300" size={24} />;
    }
  };

  const routes = [
    { label: "Início", path: "/home" },
    { label: "Favoritos", path: "/favorites" },
    { label: "Linha do Tempo", path: "/timeline" },
    { label: "Informações", path: "/info" },
  ];

  return (
    <div className="flex justify-around bg-white py-4 border-t border-gray-200 fixed bottom-0 left-0 w-full z-50">
      {routes.map(({ label, path }) => (
        <button
          key={label}
          className="flex flex-col items-center focus:outline-none"
          onClick={() => router.push(path)}
        >
          {renderIcon(label, pathname === path)}
          <span
            className={`text-xs mt-1 ${
              pathname === path ? "text-blue-700 font-semibold" : "text-blue-300"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigator;