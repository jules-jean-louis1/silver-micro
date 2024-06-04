"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function ProfilePage() {
  const { data } = useSession();
  const [bookings, setBookings] = useState<any>([]);

  if (!data) {
    return (
      <div>
        <h1>Profile Page</h1>
        <p>Please sign in to view this page.</p>
      </div>
    );
  }

  useEffect(() => {
    if (!data.user) return;
    (async () => {
      const resp_booking = await fetch(`/api/booking/user/${data.user.id}`);
      const data_booking = await resp_booking.json();
      if (data_booking.error) {
        console.error(data_booking.error);
        return;
      }
      setBookings(data_booking);
    })();
  }, [data]);

  return (
    <section>
      <article></article>
      <article>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Nombre de personnes</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 &&
              bookings.map((booking: any) => (
                <TableRow>
                  <TableCell>{booking.restaurant.name}</TableCell>
                  <TableCell>
                    {format(booking.date, "EEEE d MMMM yyyy", {
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell>
                    {format(booking.date, "hh-mm", {
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell>{booking.seat}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </article>
    </section>
  );
}

export default ProfilePage;
