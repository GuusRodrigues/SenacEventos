"use client";
import { AuthProvider } from "@/app/context/authContext";
import { FavoritesProvider } from "@/app/context/FavoritesContext";
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-auto scrollbar-hide">
        <AuthProvider>
          <FavoritesProvider>
            <div className="flex-1 pb-16 bg-gray-100 overflow-auto scrollbar-hide">
              {children}
            </div>
         </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}