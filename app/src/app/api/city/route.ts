import { City } from "@/app/models/city";
import { NextResponse } from "next/server";

export async function GET(request: any) {
    const cities = await City.findAll({ attributes: ["id", "name"]});
    if (!cities) {
        return NextResponse.json({ error: "Cities not found" }, { status: 404 });
    } else {
        return NextResponse.json(cities);
    }
}