"use client";
import { AdminBookingList } from "@/app/components/admin/booking/AdminBookingList";
import { AdminRestaurantList } from "@/app/components/admin/restaurants/AdminRestaurantList";
import { AdminUserList } from "@/app/components/admin/user/AdminUserList";
import { useSessionContext } from "@/app/utils/useSessionContext";
import { Button } from "@/components/ui/button";
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
        <article className="lg:min-w-48">
          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              onClick={() => handleSection("restaurant")}
            >
              Restaurant
            </Button>
          </div>
          <div>
            <Button className="w-full" onClick={() => handleSection("booking")}>
              Réservation
            </Button>
          </div>
          <div>
            <Button className="w-full" onClick={() => handleSection("users")}>
              Utilisateur
            </Button>
          </div>
          <div>
            <Button className="w-full" onClick={() => handleSection("menu")}>
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
