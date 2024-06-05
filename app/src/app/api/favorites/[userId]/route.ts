import "@/app/models/relationships";
import { Favorite } from "@/app/models/customer_favorite";
import { Restaurant } from "@/app/models/restaurant";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  }
) {
  const userId = params.userId;
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const favorites = await Favorite.findAll({
        where: {
          customer_id: userId,
        },
        include: [
          {
            model: Restaurant,
            attributes: ["id", "name"], 
          },
        ],
      });
    if (!favorites) {
      return Response.json({ error: "Favorite not found" }, { status: 404 });
    }
    return Response.json(favorites);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
