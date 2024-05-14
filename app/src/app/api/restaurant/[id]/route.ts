import { NextResponse } from "next/server";
import { Restaurant } from "@/app/models/restaurant"; 
import { RestaurantMenu } from "@/app/models/restaurant_menu";
import { CookingType } from "@/app/models/cooking_type";
import { FrameAmbience } from "@/app/models/frame_ambience";
import { Dishes } from "@/app/models/dishes";
import { City } from "@/app/models/city";
import "@/app/models/relationships";

export async function GET(request: any, params: any) {
    const { params: { id } } = params;
    const restaurant = await Restaurant.findByPk(id, {
        include: [
            RestaurantMenu,
            {
                model: CookingType,
                attributes: ['name'],
                through: { attributes: [] },
            },
            FrameAmbience,
            Dishes,
            City,
        ]
    });
    if (!restaurant) {
        return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }
    return NextResponse.json(restaurant);
};