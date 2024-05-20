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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Customer } from "../../../../../types/databaseTable";
import { AdminUserEdit } from "./AdminUserEdit";
import { Ellipsis } from "lucide-react";
import { AdminUserRole } from "./AdminUserRole";
import { useSessionContext } from "@/app/utils/useSessionContext";

export const AdminUserList = () => {
  const [users, setUsers] = useState([]);
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
    })();
  }, []);

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
            users.map((user: Customer) => (
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
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
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
