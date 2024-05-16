"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
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
  DialogFooter,
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
  const [clickedEdit, setClickedEdit] = useState(false);
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
          name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
            ?.value,
          seat: e.currentTarget.seat.value,
          description: e.currentTarget.description.value,
          address: e.currentTarget.address.value,
          city: e.currentTarget.city.value,
          restaurant_id: e.currentTarget.restaurant_id.value,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setClickedEdit(false);
      } else {
        console.error(data.error);
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
  }, []);

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
            {restaurants.map((restaurant: Restaurant) => (
              <TableRow key={restaurant?.id}>
                <TableCell>{restaurant.id}</TableCell>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.seat}</TableCell>
                <TableCell>
                  {restaurant.description.length > 90
                    ? restaurant.description.substring(0, 90) + "..."
                    : ""}
                </TableCell>
                <TableCell className="text-right">
                  {restaurant.address}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex space-x-1">
                    <Dialog>
                      <DialogTrigger onClick={() => setClickedEdit(true)}>
                        Edit
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Editer: {restaurant.name}</DialogTitle>
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
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="seat">Siége</Label>
                            <Input
                              type="number"
                              id="seat"
                              name="seat"
                              value={restaurant.seat}
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={restaurant.description}
                            />
                          </div>
                          <div>
                            <Label htmlFor="address">Adresse</Label>
                            <Input
                              type="text"
                              id="address"
                              name="address"
                              value={restaurant.address}
                            />
                          </div>
                          {city.length > 0 && (
                            <div>
                              <Label htmlFor="city">Ville</Label>
                              <select name="city" id="city">
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
