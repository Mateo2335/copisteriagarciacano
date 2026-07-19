import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Copistería García Cano | Impresión y Regalos en Sabadell",
  description: "Imprime tus apuntes y dossiers en A4/A3, o personaliza tus camisetas y tazas con tus mejores diseños en Sabadell (Sol i Padrís, 95).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/50">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
