import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carrot, Dot, MapPin } from "lucide-react";
import { FC } from "react";
import { ManageFavorites } from "../favorites/ManageFavorites";
import { ReviewRestaurant } from "../review/ReviewRestaurant";

type RestaurantMenuProps = {
  restaurant: any;
};
export const RestaurantMenu: FC<RestaurantMenuProps> = (props) => {
  const { restaurant } = props;

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="flex flex-col pb-4">
        <div className="flex justify-between items-center">
          <h4 className="flex space-x-1 text-sm">
            <span>
              {restaurant.cooking_types?.length > 0
                ? restaurant.cooking_types[0].name
                : "N/A"}
            </span>
            <Dot />
            <span>
              {restaurant.frame_ambiences?.length > 0
                ? restaurant.frame_ambiences[0].name
                : "N/A"}
            </span>
          </h4>
          <ManageFavorites restaurant={restaurant} />
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{restaurant?.name}</h1>
        </div>
      </section>
      <section className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <MapPin />
          <p>
            {restaurant.address},{restaurant.cities?.[0]?.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Carrot />
          <span>
            {restaurant.cooking_types?.length > 0
              ? restaurant.cooking_types[0].name
              : "N/A"}
          </span>
        </div>
      </section>
      <section className="w-full pt-4">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="account" className="w-1/2">
              Menu
            </TabsTrigger>
            <TabsTrigger value="password" className="w-1/2">
              Avis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div>
              <h3 className="text-lg">Menu</h3>
              {restaurant?.restaurant_menus?.map((menu: any) => {
                return (
                  <div className="flex justify-between py-2">
                    <div>
                      <h4>{menu?.name}</h4>
                      <p className="text-sm text-skyline-border">
                        {menu?.description ? menu?.description : "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <span>{menu?.price}</span>
                      <span>€</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="password">
            <ReviewRestaurant />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};
