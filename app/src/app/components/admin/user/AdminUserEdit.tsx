import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminUserEditProps {
  user: any;
}

export const AdminUserEdit: FC<AdminUserEditProps> = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger>Editer</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editer</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form action="" method="post">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email}
                    disabled
                />
            </div>
            <div>
                <Label htmlFor="name">Nom</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={user.lastname}
                    disabled
                />
            </div>
            <div>
                <Label htmlFor="lastname">Prénom</Label>
                <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    defaultValue={user.firstname}
                    disabled
                />
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
