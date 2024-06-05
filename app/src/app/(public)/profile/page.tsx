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
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

function ProfilePage() {
  const { data } = useSession();
  const [bookings, setBookings] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const handleSection = (section: string) => {
    router.replace(`/profile?section=${section}`);
  };

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

  useEffect(() => {
    if (!data.user) return;
    (async () => {
      const resp_favorite = await fetch(`/api/favorites/${data.user.id}`);
      const data_favorite = await resp_favorite.json();
      if (data_favorite.error) {
        console.error(data_favorite.error);
        return;
      }
      setFavorites(data_favorite);
    })();
  }, [data]);

  return (
    <section className="flex justify-center px-12 space-x-5">
      <article className="flex flex-col">
        {data.user && (
          <p>
            Welcome, {data.user.firstname} {data.user.lastname}
          </p>  
        )}
        <Button onClick={() => handleSection("booking")}>Réservations</Button>
        <Button onClick={() => handleSection("favorites")}>Favoris</Button>
      </article>
      <article>
        {!section && (
          <div>
            <h4>Bienvenue sur votre profil</h4>
          </div>
        )}
        {section === "booking" && (
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
        )}
        {section === "favorites" &&
          (favorites.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restaurant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favorites.map((favorite: any) => (
                  <TableRow key={favorite.id}>
                    <TableCell>{favorite.restaurant.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Vous n'avez pas de favoris.</p>
          ))}
      </article>
    </section>
  );
}

export default ProfilePage;
