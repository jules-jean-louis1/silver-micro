"use client";

import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
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

export const Header = () => {
  const { data } = useSession();

  return (
    <header className="w-screen h-14 lg:py-3 lg:px-2 border border-b-green-200">
      <div className="w-full flex justify-between">
        <div className="flex items-center space-x-2">
          <div>
            <Link href="/">Miam</Link>
          </div>
          <nav className="flex">
            <ul className="flex items-center space-x-2">
              <li>
                <Link href="/restaurants">
                  <h6>Restaurants</h6>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <h6>A propos</h6>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Autocomplete />
        <div>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger>{data.user.firstname}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Votre Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profil">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
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
