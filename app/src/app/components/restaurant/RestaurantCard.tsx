import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { FC } from "react";

interface RestaurantCardProps {
  restaurants: any;
}
export const RestaurantCard: FC<RestaurantCardProps> = ({ restaurants }) => {
  console.log(restaurants);
  return (
    <article className="lg:w-[48%] lg:min-h-[200px] p-3 flex border border-green-olive rounded-lg shadow-md space-x-4">
      <div className="h-full w-1/3 bg-slate-500"></div>
      <div className="flex flex-col justify-between w-full items-start">
        <p>
          {restaurants.frame_ambiances?.length > 0
            ? restaurants.frame_ambiances[0].name
            : ""}{" "}
          {restaurants.dishes?.length > 0
            ? "- " + restaurants.dishes[0].name
            : ""}{" "}
        </p>
        <h3>{restaurants.name}</h3>
        <p>
          {restaurants.address} ,{" "}
          {restaurants.cities?.length > 0 ? restaurants.cities[0].name : ""}
        </p>
        <p>
          {restaurants.cooking_types?.length > 0
            ? restaurants.cooking_types[0].name
            : ""}
        </p>
        <div className="flex justify-center">
          <Button
            size="sm"
            className="bg-green-olive text-flora-white min-w-28"
          >
            <Link href={`/restaurant/${restaurants.id}`}>Réserver</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
