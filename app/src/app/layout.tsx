import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import ClientSessionProvider from "./context/ClientSessionProvider";
import { Header } from "./components/shared/Header";

const inter = Inter({ subsets: ["latin"] });

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
      <body>
        <ClientSessionProvider session={session}>
          <Header />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
