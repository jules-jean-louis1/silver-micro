"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantPage() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/restaurant/${id}`);
      const data = await response.json();
      console.log(data);
      setRestaurant(data);
    }
    )();
  }, [id]);
  return <></>;
}
export default RestaurantPage;
