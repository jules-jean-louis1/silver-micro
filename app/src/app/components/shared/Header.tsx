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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { data } = useSession();
  const sessionCtx = useSessionContext();
  const isAutorized = sessionCtx.canAccessAdminInterface();

  const pathname = usePathname();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="flex justify-between w-screen h-[64px] lg:p-2 border border-b-wheat bg-white">
      <div className="flex items-center space-x-2 max-w-[30%] min-w-fit ml-2">
        <div>
          <Link href="/">
            <img src="/shared/icon/logoHeader.svg" alt="Logo-Miam" />
          </Link>
        </div>
        <nav className="flex">
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/restaurants">
                <h4 className="text-lg text-midnight-black">Restaurants</h4>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <h4 className="text-lg text-midnight-black">A propos</h4>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-center w-full">
        {pathname !== "/" && <Autocomplete />}
      </div>
      <div className="max-w-[30%] mr-2">
        {data ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center h-10 w-[7rem] space-x-4 rounded-[8px] bg-midnight-black text-white font-semibold">
              <UserRound className="h-6 w-6" />
              {data.user.firstname}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Votre Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profil" className="flex items-center">
                  <UserRound className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              {isAutorized && (
                <DropdownMenuItem>
                  <Link href="/admin" className="flex items-center">
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
          <Button className="flex justify-center max-h-10 space-x-2" size="sm">
            <UserRound />
            <Link href="/login">Connexion</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
