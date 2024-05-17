import { NextResponse } from "next/server";
import { FrameAmbience } from "@/app/models/frame_ambience";

export async function GET(req: any) {
  try {
    const frameAmbiances = await FrameAmbience.findAll({});
    if (!frameAmbiances) {
      return NextResponse.json({ error: "No frame ambiance found" }, { status: 404 });
    }
    return NextResponse.json(frameAmbiances);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error"}, { status: 500 });
  }
}
