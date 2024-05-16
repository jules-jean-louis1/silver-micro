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
import { Booking } from "../../../../../types/databaseTable";
import { AdminBookingEdit } from "./AdminBookingEdit";
import { bookingStatus } from "@/app/utils/Booking";
import { Button } from "@/components/ui/button";

export const AdminBookingList = () => {
  const { data } = useSession();
  const [booking, setBooking] = useState<Booking[]>([]);
  const [successEdit, setSuccessEdit] = useState<boolean>(false);
  const [successDelete, setSuccessDelete] = useState<boolean>(false);
  const [clickedDelete, setClickedDelete] = useState<boolean>(false);
  const [buttonValue, setButtonValue] = useState<string | null>(null);

  useEffect(() => {
    if (clickedDelete) {
      (async () => {
        const resp = await fetch(
          `/api/admin/booking?userId=${data?.user.id}&order_id=${buttonValue}`,
          {
            method: "DELETE",
          }
        );
        const resp_delete = await resp.json();
        if (resp_delete.error) {
          console.error(resp_delete.error);
          return;
        }
        if (resp_delete.success) {
          setSuccessDelete(true);
        }
      })();
      setClickedDelete(false);
    }
  }, [clickedDelete]);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/admin/booking?userId=" + data?.user.id);
      const resp_booking = await resp.json();
      setBooking(resp_booking);
      setSuccessEdit(false);
      setSuccessDelete(false);
    })();
  }, [successEdit, successDelete]);

  return (
    <>
      <section>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Utilisateur</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Personne</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booking.map((booking: Booking) => (
              <TableRow>
                <TableCell className="w-[200px]">
                  {booking.customer.firstname} {booking.customer.lastname}
                </TableCell>
                <TableCell>
                  {
                    bookingStatus.find((status) => status.id === booking.status)
                      ?.name
                  }
                </TableCell>
                <TableCell>{booking.seat}</TableCell>
                <TableCell>{booking.restaurant.name}</TableCell>
                <TableCell className="text-right">
                  <AdminBookingEdit
                    booking={booking}
                    successEdit={successEdit}
                    setSuccessEdit={setSuccessEdit}
                  />
                  <Button
                    variant={"destructive"}
                    onClick={(e) => {
                      setButtonValue(e.currentTarget.value);
                      setClickedDelete(true);
                    }}
                    value={booking.id}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
