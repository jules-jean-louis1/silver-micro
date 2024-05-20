import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface RestaurantCardProps {
  restaurants: any;
}
export const RestaurantCard: FC<RestaurantCardProps> = ({ restaurants }) => {

  return (
    <article className="lg:w-[48%] lg:min-h-[200px] p-3 flex border border-green-olive rounded-lg shadow-md space-x-4">
      <div className="h-full w-1/3 bg-slate-500"></div>
      <div className="flex flex-col justify-between w-full items-start">
        <p>
          {restaurants.frame_ambiences?.length > 0
            ? restaurants.frame_ambiences[0].name
            : ""}{" "}
          {restaurants.cooking_types?.length > 0
            ? "- " + restaurants.cooking_types[0].name
            : ""}{" "}
        </p>
        <h3 className="text-xl font-semibold">{restaurants.name}</h3>
        <p>
          {restaurants.address} ,{" "}
          {restaurants.cities?.length > 0 ? restaurants.cities[0].name : ""}
        </p>
        <div className="flex justify-center">
          <Button
            size="sm"
            className="flex items-center space-x-3 bg-sunshine-yellow text-midnight-black hover:bg-ecalyptus-green lg:min-w-40 font-medium"
          >
            <Link href={`/restaurant/${restaurants.id}`}>Réserver</Link>
            <MoveRight />
          </Button>
        </div>
      </div>
    </article>
  );
};
