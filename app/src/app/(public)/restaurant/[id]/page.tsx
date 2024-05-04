"use client";

import { BookingForm } from "@/app/components/restaurant/booking/BookingForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantPage() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  let [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [daysClosed, setDaysClosed] = useState({
    monday: false,
    tuesday: false,
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/restaurant/${id}`);
      const data = await response.json();
      setRestaurant(data);
      setDaysClosed({
        monday: data.close_monday,
        tuesday: data.close_tuesday,
      });
    })();
  }, [id]);

  return (
    <>
      <section className="w-screen h-[calc(100vh-56px)] flex space-x-2">
        <article></article>
        <article>
        </article>
        <article>
          <BookingForm />
        </article>
      </section>
    </>
  );
}
export default RestaurantPage;
