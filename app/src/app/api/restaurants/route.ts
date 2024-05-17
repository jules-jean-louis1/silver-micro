import "@/app/models/relationships";
import { City } from "@/app/models/city";
import { Restaurant } from "@/app/models/restaurant";
import { RestaurantMenu } from "@/app/models/restaurant_menu";
import { CookingType } from "@/app/models/cooking_type";
import { FrameAmbience } from "@/app/models/frame_ambience";
import { Dishes } from "@/app/models/dishes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        RestaurantMenu,
        {
          model: CookingType,
          attributes: ["name"],
          through: { attributes: [] },
        },
        FrameAmbience,
        Dishes,
        City,
      ],
    });
    if (!restaurants) {
      return NextResponse.json(
        { error: "No restaurants found" },
        { status: 404 }
      );
    }
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
