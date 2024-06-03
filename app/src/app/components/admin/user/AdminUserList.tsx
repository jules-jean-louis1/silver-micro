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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AdminUserEdit } from "./AdminUserEdit";
import { Ellipsis } from "lucide-react";
import { AdminUserRole } from "./AdminUserRole";
import { useSessionContext } from "@/app/utils/useSessionContext";

type Restaurant = {
  id: number;
  name: string;
};

type CustomerRoleRestaurant = {
  customer_id: number;
  restaurant_id: number;
  role: string;
  restaurant: Restaurant;
};

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string | null;
  created_at: string;
  customer_role_restaurants: CustomerRoleRestaurant[];
};

export const AdminUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [clickedDelete, setClickedDelete] = useState<any>({
    state: false,
    userId: 0,
  });
  const [successDelete, setSuccessDelete] = useState(false);
  const { data } = useSession();
  const sessionCtx = useSessionContext();
  const canManageUser = sessionCtx.canManageInAdmin();

  useEffect(() => {
    (async () => {
      const users = await fetch("/api/admin/customers/" + data?.user.id);
      const resp_users = await users.json();

      if (resp_users.error) {
        console.error(resp_users.error);
        return;
      }
      setUsers(resp_users);
      setSuccessDelete(false);
    })();
  }, [successDelete]);

  useEffect(() => {
    if (!clickedDelete.state) {
      return;
    }
    const user = users.find((user) => user.id === clickedDelete.userId);
    let userRole = "user";

    if (user) {
      const superAdminRole = user.customer_role_restaurants.some(
        (role) => role.role === "superadmin"
      );

      if (superAdminRole) {
        userRole = "superadmin";
      } else {
        const adminRole = user.customer_role_restaurants.some(
          (role) => role.role === "admin"
        );

        if (adminRole) {
          userRole = "admin";
        }
      }
    }
    (async () => {
      const resp = await fetch("/api/admin/customers/" + clickedDelete.userId, {
        method: "DELETE",
        body: JSON.stringify({
          role: userRole,
        }),
      });
      const resp_delete = await resp.json();
      if (resp_delete.error) {
        return;
      }
      if (resp_delete.success) {
        setSuccessDelete(true);
      }
    })();
    setClickedDelete({ state: false });
  }, [clickedDelete]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Table>
        <TableCaption>List des Utilisateurs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead className="text-right">Role/Restaurant</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 &&
            users.map((user: User) => (
              <TableRow key={user?.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell className="text-right">
                  {user.customer_role_restaurants.map((roleRestaurant, index) =>
                    roleRestaurant.role === "superadmin" ? (
                      <p key={index}>{roleRestaurant.role}</p>
                    ) : (
                      <p
                        key={index}
                      >{`${roleRestaurant.role} at ${roleRestaurant.restaurant.name}`}</p>
                    )
                  )}
                </TableCell>
                {canManageUser && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={(event) => event.preventDefault()}
                        >
                          <AdminUserRole user={user} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(event) => event.preventDefault()}
                        >
                          <AdminUserEdit user={user} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setClickedDelete({ state: true, userId: user.id })
                          }
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
