import { Dishes } from "@/app/models/dishes";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const dishes = await Dishes.findAll({});
    if (!dishes) {
      return NextResponse.json({ error: "No frame ambiance found" }, { status: 404 });
    }
    return NextResponse.json(dishes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error"}, { status: 500 });
  }
}
