import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FC, use, useEffect, useState } from "react";

export const ReviewRestaurant: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useSession();
    const [review, setReview] = useState<any>([]);

    const handleSubmitReview = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`/api/restaurant/review/${id}/${data?.user.id}`, {
            method: "POST",
            body: JSON.stringify({ review }),
        });
        const resp_review = await response.json();
        setReview(resp_review);
    }

  return (
    <>
      <div className="w-full">
        <h1 className="text-lg font-semibold">Donnez votre avis</h1>
        <form action="" method="post" onSubmit={(e) => handleSubmitReview(e)}>
          <Textarea />
          <button
            type="submit"
            className="bg-sunshine-yellow text-midnight-black font-medium p-2 rounded-lg"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};
