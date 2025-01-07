import type { Metadata } from "next";
import "../src/globals.css";



export const metadata: Metadata = {
  title: "Senac Eventos",
  description: "Sua agenda personalizada de eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
