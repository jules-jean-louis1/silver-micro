"use client";

import { BookingForm } from "@/app/components/restaurant/booking/BookingForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/restaurant/${id}`);
      const data = await response.json();
      setRestaurant(data);
    })();
  }, [id]);

  return (
    <>
      <section className="w-screen h-[calc(100vh-56px)] flex space-x-2">
        <article></article>
        <article>
        </article>
        <article>
          <BookingForm restaurant={restaurant}/>
        </article>
      </section>
    </>
  );
}
export default RestaurantPage;
