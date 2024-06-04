"use client";
import { AdminBookingList } from "@/app/components/admin/booking/AdminBookingList";
import { AdminRestaurantList } from "@/app/components/admin/restaurants/AdminRestaurantList";
import { AdminUserList } from "@/app/components/admin/user/AdminUserList";
import { useSessionContext } from "@/app/utils/useSessionContext";
import { Button } from "@/components/ui/button";
import { NotebookPen, SquareMenu, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function AdminPage() {
  const { data } = useSession();
  const sessionCtx = useSessionContext();
  const isAuthorized = sessionCtx?.canAccessAdminInterface();
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const handleSection = (section: string) => {
    router.replace(`/admin?section=${section}`);
  };

  useEffect(() => {
    if (section === "") {
      handleSection("restaurant");
    }
  }, []);

  return isAuthorized ? (
    <>
      <section className="flex space-x-3 lg:px-16">
        <article className="lg:min-w-48 pt-8 flex flex-col space-y-4">
          <div className="">
            <Button
              className="w-full"
              onClick={() => handleSection("restaurant")}
            >
              Restaurant
            </Button>
          </div>
          <div>
            <Button
              className="flex space-x-3 w-full"
              onClick={() => handleSection("booking")}
            >
              <NotebookPen />
              Réservation
            </Button>
          </div>
          <div>
            <Button
              className="flex space-x-3 w-full"
              onClick={() => handleSection("users")}
            >
              <UserRound />
              Utilisateur
            </Button>
          </div>
          <div>
            <Button
              className="flex space-x-3 w-full"
              onClick={() => handleSection("menu")}
            >
              <SquareMenu />
              Menu
            </Button>
          </div>
        </article>
        <article className="w-full">
          {section === "restaurant" && <AdminRestaurantList />}
          {section === "booking" && <AdminBookingList />}
          {section === "users" && <AdminUserList />}
        </article>
      </section>
    </>
  ) : null;
}
export default AdminPage;
