import "@/app/models/relationships";
import sequelize from "@/app/api/config";
import { authOptions } from "../../auth/[...nextauth]/route";
import { CustomerRole } from "@/app/models/customer_role_restaurant";
import { Restaurant } from "@/app/models/restaurant";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { RestaurantMenu } from "@/app/models/restaurant_menu";
import { CookingType } from "@/app/models/cooking_type";
import { FrameAmbience } from "@/app/models/frame_ambience";
import { Dishes } from "@/app/models/dishes";
import { City } from "@/app/models/city";
import { CityRestaurant } from "@/app/models/city_restaurant";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "";
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.id !== parseInt(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (userId.length === 0) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const result = await sequelize.transaction(async (t: any) => {
      const userRestaurants = await CustomerRole.findAll({
        where: { customer_id: userId },
        transaction: t,
      });
      console.log(userRestaurants);
      if (userRestaurants.length === 0) {
        return NextResponse.json(
          { error: "No restaurants found" },
          { status: 404 }
        );
      }
      if (
        userRestaurants.find(
          (restaurant: any) => restaurant.dataValues.role === "superadmin"
        )
      ) {
        const restaurant = await Restaurant.findAll({
          include: [
            RestaurantMenu,
            {
              model: CookingType,
              attributes: ["id", "name"],
              through: { attributes: [] },
            },
            FrameAmbience,
            Dishes,
            City,
          ],
          transaction: t,
        });
        return restaurant;
      } else {
        const restaurant_ids = userRestaurants.map(
          (restaurant: any) => restaurant.restaurant_id
        );
        const restaurant = await Restaurant.findAll({
          where: {
            id: restaurant_ids,
          },
          include: [
            RestaurantMenu,
            {
              model: CookingType,
              attributes: ["id", "name"],
              through: { attributes: [] },
            },
            FrameAmbience,
            Dishes,
            City,
          ],
          transaction: t,
        });
        return restaurant;
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(req: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  if (
    !body.restaurant_id ||
    !body.name ||
    !body.seat ||
    !body.description ||
    !body.address ||
    !body.city_id
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const restaurant = await Restaurant.findByPk(body.restaurant_id);
    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }
    await sequelize.transaction(async (t: any) => {
      await restaurant.update(
        {
          name: body.name,
          seat: body.seat,
          description: body.description,
          address: body.address,
        },
        { transaction: t }
      );
      const cityRestaurant = await CityRestaurant.findOne({
        where: { restaurant_id: body.restaurant_id },
        transaction: t,
      });
      if (cityRestaurant) {
        await cityRestaurant.update(
          { city_id: body.city_id },
          { transaction: t }
        );
      } else {
        await CityRestaurant.create(
          {
            restaurant_id: body.restaurant_id,
            city_id: body.city_id,
          },
          { transaction: t }
        );
      }
    });
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
