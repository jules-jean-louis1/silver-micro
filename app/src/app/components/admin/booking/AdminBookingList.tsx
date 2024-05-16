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
import { Booking } from "../../../../../types/databaseTable";
import { AdminBookingEdit } from "./AdminBookingEdit";
import { bookingStatus } from "@/app/utils/Booking";

export const AdminBookingList = () => {
  const { data } = useSession();
  const [booking, setBooking] = useState<Booking[]>([]);
  const [successEdit, setSuccessEdit] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/admin/booking?userId=" + data?.user.id);
      const resp_booking = await resp.json();
      setBooking(resp_booking);
      setSuccessEdit(false);
    })();
  }, [successEdit]);

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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
