import "@/app/models/relationships";
import { Order } from "@/app/models/order";
import { Restaurant } from "@/app/models/restaurant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "No id" }, { status: 404 });
  }
  try {
    const booking = await Order.findAll({
      where: {
        customer_id: id,
      },
      include: [
        {
          model: Restaurant,
          attributes: ["name"],
        },
      ],
    });
    if (!booking) {
      return NextResponse.json({ error: "No booking found" }, { status: 404 });
    }
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
