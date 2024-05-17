"use client";
import { useEffect, useState } from "react";

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/restaurants");
      const data = await resp.json();
      console.log(data);
      if (data.error) {
        console.error(data.error);
        return;
      }
      setRestaurants(data);
    })();
  }, []);

  return (
    <>
    <div className="grid grid-flow-row px-52"></div>
      <section></section>
      <section></section>
    </>
  );
}

export default RestaurantsPage;
