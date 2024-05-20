"use client";

import { Button } from "@/components/ui/button";
import { Autocomplete } from "../components/shared/Autocomplete";
import Link from "next/link";

function Home() {
  return (
    <section className="pt-12">
      <article className="lg:min-h-[420px] lg:min-w-screen rounded-[12px] bg-ghost-white lg:mx-28 flex justify-center items-center">
        <div className="flex flex-col space-y-3">
          <h1 className="text-5xl text-lemon-yellow serif">
            Trouver le meilleur restaurant
          </h1>
          <Autocomplete />
          <div>
            <Button type="button" variant={"ghost"}>
              <Link href="/restaurants">Voir tous les restaurants</Link>
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Home;
