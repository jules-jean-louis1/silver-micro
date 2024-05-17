import "@/app/models/relationships";
import { City } from "@/app/models/city";
import { Restaurant } from "@/app/models/restaurant";
import { RestaurantMenu } from "@/app/models/restaurant_menu";
import { CookingType } from "@/app/models/cooking_type";
import { FrameAmbience } from "@/app/models/frame_ambience";
import { Dishes } from "@/app/models/dishes";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const restaurants = await Restaurant.findAll({
//       include: [
//         RestaurantMenu,
//         {
//           model: CookingType,
//           attributes: ["name"],
//           through: { attributes: [] },
//         },
//         FrameAmbience,
//         Dishes,
//         City,
//       ],
//     });
//     if (!restaurants) {
//       return NextResponse.json(
//         { error: "No restaurants found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(restaurants);
//   } catch (error) {
//     return NextResponse.json({ error: "Error" }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const cookingType = searchParams.get("cooking_type");
  const frameAmbiance = searchParams.get("frame_ambiance");
  const dish = searchParams.get("dish");
  const page = searchParams.get("page");

  if (!city && !cookingType && !frameAmbiance && !dish) {
    try {
      const restaurants = await Restaurant.findAll({
        include: [
          RestaurantMenu,
          {
            model: CookingType,
            attributes: ["name"],
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
  } else {
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
        where: {
          ...(city && { "$cities.id$": city }),
          ...(cookingType && { "$cooking_types.id$": cookingType }),
          ...(frameAmbiance && { "$frame_ambiences.id$": frameAmbiance }),
          ...(dish && { "$dishes.id$": dish }),
        },
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
}
