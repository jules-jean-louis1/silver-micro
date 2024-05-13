"use client";

import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";


export const Header = () => {
  const {data} = useSession();

  return (
    <header className="w-screen h-14 p-3">
      <div className="w-full flex justify-between">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          {data ? (
            <Button className="flex justify-center">
              <UserRound />
              <Link href="/profile">{data.user.firstname}</Link>
            </Button>
          ) : (
            <Button className="flex justify-center">
              <UserRound />
              <Link href="/login">Connexion</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
