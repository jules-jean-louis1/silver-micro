import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import ClientSessionProvider from "./context/ClientSessionProvider";
import { Header } from "./components/shared/Header";
import { Poppins as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400"
})

export const metadata: Metadata = {
  title: "Miam - Restaurant",
  description: "Miam - Restaurant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientSessionProvider session={session}>
          <Header />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
