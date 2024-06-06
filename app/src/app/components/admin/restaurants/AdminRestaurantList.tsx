"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { City, Restaurant } from "../../../../../types/databaseTable";

export const AdminRestaurantList = () => {
  const { data } = useSession();
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState<any>({});
  const [clickedEdit, setClickedEdit] = useState(false);
  const [resultEdit, setResultEdit] = useState(false);
  const [city, setCity] = useState([]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/restaurants", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: restaurant.name,
          seat: restaurant.seat,
          description: restaurant.description,
          address: restaurant.address,
          city_id: restaurant.city
            ? restaurant.city
            : restaurant.cities &&
              restaurant.cities[0] &&
              restaurant.cities[0].city_restaurant
            ? restaurant.cities[0].city_restaurant.city_id
            : null,
          restaurant_id: restaurant.id,
        }),
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      }
      if (response.status === 200) {
        setClickedEdit(false);
        setResultEdit(true);
      }
    } catch (error) {
      console.error("Edit failed", error);
    }
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        "/api/admin/restaurants?userId=" + data?.user.id
      );
      const resp_restaurant = await resp.json();
      setRestaurants(resp_restaurant);
    })();
    setResultEdit(false);
  }, [resultEdit]);

  useEffect(() => {
    if (!clickedEdit) return;
    (async () => {
      const resp = await fetch("/api/city");
      const resp_city = await resp.json();
      setCity(resp_city);
    })();
  }, [clickedEdit]);

  return (
    <div>
      <section className="w-full h-full">
        <Table>
          <TableCaption>Lists des Restaurants</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Siége</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Adresse</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.length > 0 &&
              restaurants.map((resto: Restaurant) => (
                <TableRow key={resto?.id}>
                  <TableCell>{resto.id}</TableCell>
                  <TableCell>{resto.name}</TableCell>
                  <TableCell>{resto.seat}</TableCell>
                  <TableCell>
                    {resto.description.length > 90
                      ? resto.description.substring(0, 90) + "..."
                      : ""}
                  </TableCell>
                  <TableCell className="text-right">{resto.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-1">
                      <Dialog>
                        <DialogTrigger
                          onClick={() => {
                            setClickedEdit(true);
                            setRestaurant(resto);
                          }}
                        >
                          Edit
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Editer: {resto.name}</DialogTitle>
                            <DialogDescription>
                              Editer les informations du restaurant
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            className="sm:min-h-[600px] flex flex-col justify-around"
                            onSubmit={handleEditSubmit}
                          >
                            <input
                              type="hidden"
                              name="restaurant_id"
                              value={restaurant.id}
                            />
                            <div className="flex flex-col">
                              <Label htmlFor="name">Nom</Label>
                              <Input
                                type="text"
                                id="name"
                                name="name"
                                value={restaurant.name}
                                onChange={(e) =>
                                  setRestaurant({
                                    ...restaurant,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col">
                              <Label htmlFor="seat">Siége</Label>
                              <Input
                                type="number"
                                id="seat"
                                name="seat"
                                value={restaurant.seat}
                                onChange={(e) =>
                                  setRestaurant({
                                    ...restaurant,
                                    seat: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-col">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                name="description"
                                value={restaurant.description}
                                onChange={(e) =>
                                  setRestaurant({
                                    ...restaurant,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="address">Adresse</Label>
                              <Input
                                type="text"
                                id="address"
                                name="address"
                                value={restaurant.address}
                                onChange={(e) =>
                                  setRestaurant({
                                    ...restaurant,
                                    address: e.target.value,
                                  })
                                }
                              />
                            </div>
                            {city.length > 0 && (
                              <div>
                                <Label htmlFor="city">Ville</Label>
                                <select
                                  name="city"
                                  id="city"
                                  onChange={(e) =>
                                    setRestaurant({
                                      ...restaurant,
                                      city: e.target.value,
                                    })
                                  }
                                >
                                  {city.map((city: City) =>
                                    city.id === restaurant.cities[0].id ? (
                                      <option
                                        key={city.id}
                                        value={city.id}
                                        selected
                                      >
                                        {city.name}
                                      </option>
                                    ) : (
                                      <option key={city.id} value={city.id}>
                                        {city.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            )}
                            <Button type="submit">Enregister</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button className="btn" variant="ghost">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
