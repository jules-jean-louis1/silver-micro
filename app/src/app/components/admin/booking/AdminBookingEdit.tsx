import { FC, useState } from "react";
import { Booking } from "../../../../../types/databaseTable";
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
import { Input } from "@/components/ui/input";
import { bookingStatus } from "@/app/utils/Booking";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface AdminBookingEditProps {
  booking: Booking;
  setSuccessEdit: (value: boolean) => void;
  successEdit: boolean;
}

export const AdminBookingEdit: FC<AdminBookingEditProps> = ({
  booking,
  setSuccessEdit,
  successEdit,
}) => {
  const { data } = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleEditBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/admin/booking?userId=" + data?.user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: e.currentTarget.order_id.value,
          seat: e.currentTarget.seat.value,
          status: selectedStatus,
        }),
      });
      const resp_edit = await resp.json();

      if (resp_edit.error) {
        console.error(resp_edit.error);
        return;
      }
      if (resp_edit.success) {
        setSuccessEdit(true);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
          Editer
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editer une réservation</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form action="" method="post" onSubmit={handleEditBooking}>
            <div>
              <Input type="hidden" name="order_id" value={booking.id} />
            </div>
            <div>
              <Label>Nom de l'utilisateur</Label>
              <Input
                type="text"
                disabled
                name="name"
                value={booking.customer.lastname}
              />
            </div>
            <div>
              <Label>Nom du Restaurant</Label>
              <Input
                type="text"
                disabled
                name="restaurant_name"
                value={booking.restaurant.name}
              />
            </div>
            <div>
              <Label>Nombre de personnes</Label>
              <Input type="number" name="seat" value={booking.seat} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Statut de la réservation</Label>
              <Select onValueChange={(value) => setSelectedStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Statut de la réservation" />
                </SelectTrigger>
                <SelectContent>
                  {bookingStatus.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2">
              <Button type="submit">Modifier</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
