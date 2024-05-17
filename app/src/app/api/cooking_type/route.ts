
import { CookingType } from "@/app/models/cooking_type";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const cooking_type = await CookingType.findAll({});
    if (!cooking_type) {
      return NextResponse.json({ error: "No frame ambiance found" }, { status: 404 });
    }
    return NextResponse.json(cooking_type);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error"}, { status: 500 });
  }
}
