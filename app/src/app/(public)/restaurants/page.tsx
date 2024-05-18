"use client";
import { FiltersRestaurants } from "@/app/components/restaurant/FiltersRestaurants";
import { RestaurantCard } from "@/app/components/restaurant/RestaurantCard";
import { useEffect, useState } from "react";

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    city: "",
    frameAmbiance: "",
    dish: "",
    cookingType: "",
  });

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        `/api/restaurants?city=${selectedFilters.city}&frame_ambiance=${selectedFilters.frameAmbiance}&dish=${selectedFilters.dish}&cooking_type=${selectedFilters.cookingType}&page=${page}`
      );
      const data = await resp.json();
      if (data.error) {
        console.error(data.error);
        return;
      }
      setRestaurants(data);
    })();
  }, [selectedFilters]);

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] gap-4 bg-flora-white px-52 pt-12">
        <section>
          <FiltersRestaurants
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </section>
        <section className="w-full overflow-y-auto flex-auto h-[calc(100vh-104px)]">
          {restaurants.length > 0 ? (
            <div className="flex flex-wrap gap-4 m-2">
              {restaurants.map((restaurant: any) => {
                return <RestaurantCard restaurants={restaurant} />;
              })}
            </div>
          ) : (
            <p>Aucun restaurant trouvé</p>
          )}
        </section>
      </div>
    </>
  );
}

export default RestaurantsPage;
