"use client";

import { useAuth } from "@/app/context/authContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div>
      <h1>Bem-vindo ao Senac Eventos!</h1>
    </div>
  );
}