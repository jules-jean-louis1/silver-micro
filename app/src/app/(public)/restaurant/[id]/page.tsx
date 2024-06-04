"use client";

import { RestaurantMenu } from "@/app/components/restaurant/RestaurantMenu";
import { RestaurantPhotos } from "@/app/components/restaurant/RestaurantPhotos";
import { BookingForm } from "@/app/components/restaurant/booking/BookingForm";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();

  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/restaurant/${id}`);
      const data = await response.json();
      setRestaurant(data);
    })();
  }, [id]);

  return (
    <>
      <section className="w-screen h-screen lg:h-[calc(100vh-56px)] pb-6 lg:pb-0 flex flex-col lg:grid lg:grid-flow-row lg:grid-cols-3 bg-flora-white pt-4 px-16 gap-10">
        <article>
          <RestaurantPhotos />
        </article>
        <article className="mt-4">
          <RestaurantMenu restaurant={restaurant} />
        </article>
        <article className="mt-4">
          <BookingForm restaurant={restaurant} />
        </article>
      </section>
    </>
  );
}
export default RestaurantPage;
