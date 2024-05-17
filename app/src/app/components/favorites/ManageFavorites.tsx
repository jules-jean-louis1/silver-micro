import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

interface ManageFavoritesProps {
  restaurant: any;
}

export const ManageFavorites: FC<ManageFavoritesProps> = ({ restaurant }) => {
  const { data } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleFavorite = async () => {
    if (isFavorite) {
      const response = await fetch(
        `/api/favorites/${data?.user.id}/${restaurant.id}`,
        {
          method: "DELETE",
        }
      );
      const resp_data = await response.json();
      if (resp_data.error) {
        console.error(resp_data.error);
        return;
      }
      if (resp_data.success) {
        setIsFavorite(false);
      }
    } else {
      const response = await fetch(
        `/api/favorites/${data?.user.id}/${restaurant.id}`,
        {
          method: "POST",
        }
      );
      const resp_data = await response.json();
      if (resp_data.error) {
        console.error(resp_data.error);
        return;
      }
      if (resp_data.success) {
        setIsFavorite(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/favorites/${data?.user.id}/${restaurant.id}`
      );
      const resp_data = await response.json();
      if (resp_data.error) {
        return;
      }
      if (resp_data.id) {
        setIsFavorite(true);
      }
    })();
  }, [restaurant]);

  useEffect(() => {
    if (clicked) {
      handleFavorite();
      setClicked(false);
    }
  }, [clicked]);

  return (
    <>
      <Button onClick={() => setClicked(true)}>
        {isFavorite ? <Heart color="red" /> : <Heart />}
      </Button>
    </>
  );
};
