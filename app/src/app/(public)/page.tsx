"use client";

import { Button } from "@/components/ui/button";
import { Autocomplete } from "../components/shared/Autocomplete";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/restaurants");
      const data = await response.json();
      setRestaurants(data);
    })();
  }, []);
  return (
    <>
      <section className="lg:pt-12">
        <article className="min-h-[60vh] lg:min-h-[420px] lg:min-w-screen rounded-[12px] bg-ghost-white lg:mx-28 flex justify-center items-center">
          <div className="flex flex-col space-y-3">
            <h1 className="text-center text-5xl text-lemon-yellow serif">
              Découvrez et réserver le meilleur restaurant
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
      <section className="pt-12">
        <article className="flex flex-col lg:min-h-[420px] lg:min-w-screen lg:mx-48">
          <div className="flex justify-between item-center">
            <h2 className="text-center lg;text-left text-3xl font-semibold">
              Les restaurants les plus populaires
            </h2>
            <Button type="button" variant={"ghost"} className="hidden lg:flex">
              <Link href="/restaurants">Voir tous les restaurants</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 m-2">
            {restaurants.slice(0, 4).map((restaurant, index) => (
              <RestaurantCard key={index} restaurants={restaurant} />
            ))}
          </div>
        </article>
      </section>
    </>
  );
}

export default Home;
