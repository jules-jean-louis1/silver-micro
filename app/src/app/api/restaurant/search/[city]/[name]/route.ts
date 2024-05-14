import { Op } from "sequelize";
import { City } from "@/app/models/city";
import { Restaurant } from "@/app/models/restaurant";
import { NextResponse } from "next/server";
import "@/app/models/relationships";

export async function GET(request:any, params:any) {
    const { params: { city, name } } = params;
    console.log(city, name);
    const restaurant = await Restaurant.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%', 
            },
        },
        include: {
            model: City,
            where: {
                name: city,
            },
        },
    });
    if (!restaurant) {
        return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }
    return NextResponse.json(restaurant);
}