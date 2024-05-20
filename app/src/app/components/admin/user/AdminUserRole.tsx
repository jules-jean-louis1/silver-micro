import { FC, use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface AdminUserRoleProps {
  user: any;
}

interface AdminAddRoleUserProps {
  restaurantView: any;
  user: any;
}
export const AdminAddRoleUser: FC<AdminAddRoleUserProps> = ({
  restaurantView,
  user,
}) => {
  return <></>;
};

export const AdminUserRole: FC<AdminUserRoleProps> = ({ user }) => {
  const { data } = useSession();
  const [restaurantView, setRestaurantView] = useState([]);
  const [roles, setRoles] = useState<
    { restaurant_id: number; role: string; customer_id: number }[]
  >([]);

  const [role, setRole] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");
  const [restaurant_id, setRestaurantId] = useState<string>("");
  const user_id = user.id ?? 0;
  const [newRoles, setNewRoles] = useState<any>([]);

  const userRestaurants = user?.customer_role_restaurants.map(
    (role: { restaurant_id: any }) => role.restaurant_id
  );

  const filteredRestaurants = restaurantView.filter((restaurant: any) => {
    if (!data) {
      return false;
    }
    if (data.roles.some((role) => role.role === "superadmin")) {
      return true;
    }
    return userRestaurants.includes(restaurant.id);
  });

  const addRole = (
    restaurant_id: number,
    role: string,
    customer_id: number
  ) => {
    setRoles((prevRoles) => [
      ...prevRoles,
      {
        restaurant_id: restaurant_id,
        role: role,
        customer_id: customer_id,
      },
    ]);
  };

  const handleChangeRole = async (
    restaurant_id: number,
    role: string,
    customer_id: number,
    e: any
  ) => {
    setRoles((prevRoles) => [
      ...prevRoles,
      {
        restaurant_id: restaurant_id,
        role: role,
        customer_id: customer_id,
      },
    ]);
    e.preventDefault();
    console.log(restaurant_id, role, customer_id);
    const resp = await fetch("/api/admin/customer/" + user_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        restaurant_id: restaurant_id,
      }),
    });
    const resp_json = await resp.json();
    console.log(resp_json);
  };

  const handleAddNewRole = async (
    restaurant_id: string,
    role: string,
    e: any
  ) => {
    // setRoles((prevRoles) => [
    //   ...prevRoles,
    //   {
    //     restaurant_id: restaurant_id,
    //     role: role,
    //     customer_id: customer_id,
    //   },
    // ]);
    e.preventDefault();
    const resp = await fetch("/api/admin/customer/" + user_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        restaurant_id: restaurant_id,
      }),
    });
    const resp_json = await resp.json();
    console.log(resp_json);
  };

  const addNewRoleButton = () => {
    setNewRoles((prevRoles: any) => [...prevRoles, {}]);
  };

  const removeRole = async (restaurantId: any) => {
    const resp = await fetch("/api/admin/customer/" + user_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurant_id: restaurantId,
      }),
    });
    const resp_json = await resp.json();
    console.log(resp_json);
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        "/api/admin/restaurants?userId=" + data?.user.id
      );
      const resp_restaurant = await resp.json();
      setRestaurantView(resp_restaurant);
    })();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>Rôle</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rôle Management</DialogTitle>
          <DialogDescription>
            Ici vous pouvez changer le rôle de l'utilisateur {user.lastname}{" "}
            {user.firstname} dans un restaurant.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          {user.customer_role_restaurants.length > 0 &&
            user.customer_role_restaurants.map(
              (roleRestaurant: any, index: number) => {
                const isAdmin = data?.roles.find(
                  (role: any) => role.role === "superadmin"
                );
                const isManager = data?.roles.find(
                  (role: any) =>
                    role.role === "admin" &&
                    role.restaurant_id === roleRestaurant.restaurant_id
                );

                return (
                  <form
                    className="flex flex-col"
                    key={index}
                    onSubmit={(e) =>
                      handleChangeRole(
                        roleRestaurant.restaurant_id,
                        role,
                        user_id,
                        e
                      )
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <Select onValueChange={(value) => setRestaurantId(value)}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={roleRestaurant.restaurant.name}
                          />
                        </SelectTrigger>
                      </Select>
                      <Select onValueChange={(value) => setRole(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={roleRestaurant.role} />
                        </SelectTrigger>
                        {isAdmin && (
                          <SelectContent>
                            <SelectItem value="admin">admin</SelectItem>
                            <SelectItem value="manager">manager</SelectItem>
                          </SelectContent>
                        )}
                        {isManager && (
                          <SelectContent>
                            <SelectItem value="manager">manager</SelectItem>
                          </SelectContent>
                        )}
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 justify-end">
                      <Button type="submit">Changer</Button>
                      <Button type="button" variant="destructive">
                        Supprimer
                      </Button>
                    </div>
                  </form>
                );
              }
            )}
          {newRoles.map((role: any, index: number) => (
            <form
              className="flex flex-col"
              key={index}
              method="post"
              onSubmit={(e) => handleAddNewRole(restaurant_id, newRole, e)}
            >
              <div className="flex items-center space-x-3">
                <Select onValueChange={(value) => setRestaurantId(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un restaurant" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredRestaurants.map((restaurant: any, index) => (
                      <SelectItem key={index} value={restaurant.id}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setNewRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="manager">manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 justify-end">
                <Button type="submit">Ajouter</Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeRole(restaurant_id)}
                >
                  Supprimer
                </Button>
              </div>
            </form>
          ))}
          <Button type="button" onClick={addNewRoleButton}>
            Ajouter un rôle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
