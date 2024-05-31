import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import ClientSessionProvider from "./context/ClientSessionProvider";
import { Header } from "./components/shared/Header";
import { Poppins as FontSans, DM_Serif_Display as FontSerif } from "next/font/google"

import { cn } from "@/lib/utils"
import Head from "next/head";
import Link from "next/link";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400"
})

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
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
      <Head>
        <Link href="../../public/shared/icon/logoTabs.svg" rel="icon" />
      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
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
