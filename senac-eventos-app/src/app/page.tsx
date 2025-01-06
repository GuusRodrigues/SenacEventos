"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import LoginScreen from "@/pages/login";
import TabNavigator from "@/navigators/tabNavgator";
import { FavoritesProvider } from "@/context/favoritesContext";

const App = () => {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <FavoritesProvider>
      <div className="min-h-screen">
        {pathname === "/login" && <LoginScreen />}
        {pathname === "/tabNavigator" && <TabNavigator />}
      </div>
    </FavoritesProvider>
  );
};

export default App;