import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "SPI Smart Flow | Portal de Documentación Inteligente",
  description: "Gestiona tus documentos legales con inteligencia artificial. Acelera el proceso de OTA y maximiza tus incentivos.",
  keywords: ["legal tech", "documentos", "OTA", "SPI", "inteligencia artificial"],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
