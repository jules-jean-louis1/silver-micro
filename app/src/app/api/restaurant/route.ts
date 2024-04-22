import { NextResponse } from "next/server";
import { Restaurant } from "../../models/restaurant";
import sequelize from "../config";

sequelize.sync();

export async function GET() {
    // return NextResponse.json({ message: "Hello World" });
    const restaurants = await Restaurant.findAll();
    return NextResponse.json(restaurants);
  }