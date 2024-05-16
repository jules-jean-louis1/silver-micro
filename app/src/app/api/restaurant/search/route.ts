import { Op, Sequelize } from "sequelize";
import { City } from "@/app/models/city";
import { Restaurant } from "@/app/models/restaurant";
import { NextResponse } from "next/server";
import "@/app/models/relationships";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "";
  const restaurantName = searchParams.get("restaurant_name") || "";

  if (city.length === 0 && restaurantName.length > 0) {
    const restaurant = await Restaurant.findAll({
      where: {
        name: {
          [Op.like]: `%${restaurantName}%`,
        },
      },
      include: City,
    });
    return NextResponse.json(restaurant);
  }

  const restaurant = await Restaurant.findAll({
    where: {
      name: {
        [Op.like]: `%${restaurantName}%`,
      },
    },
    include: {
      model: City,
      where: {
        name: {
          [Op.like]: `%${city}%`,
        },
      },
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(restaurant);
}
