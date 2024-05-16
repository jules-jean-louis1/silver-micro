"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Shield, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Autocomplete } from "./Autocomplete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionContext } from "@/app/utils/useSessionContext";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { data } = useSession();
  const sessionCtx = useSessionContext();
  const isAutorized = sessionCtx.canAccessAdminInterface();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="w-screen h-14 lg:py-2 lg:px-2 border border-b-wheat bg-flora-white">
      <div className="w-full flex justify-between">
        <div className="flex items-center space-x-2">
          <div>
            <Link href="/">
              <img src="/shared/icon/logoHeader.svg" alt="Logo-Miam" />
            </Link>
          </div>
          <nav className="flex">
            <ul className="flex items-center space-x-4">
              <li>
                <Link href="/restaurants">
                  <h4 className="text-lg text-green-olive">Restaurants</h4>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <h4 className="text-lg text-green-olive">A propos</h4>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Autocomplete />
        <div>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center h-10 w-[7rem] space-x-4 rounded-[8px] bg-green-olive text-flora-white font-semibold">
                <UserRound className="h-6 w-6" />
                {data.user.firstname}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Votre Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profil">
                    <UserRound className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                {isAutorized && (
                  <DropdownMenuItem>
                    <Link href="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Espace Admin</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="flex justify-center max-h-10 space-x-2"
              size="sm"
            >
              <UserRound />
              <Link href="/login">Connexion</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
