import { Order } from "@/app/models/order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: any) {
  const data = await request.json();
  if (!data) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const { restaurant_id, date, seats } = data;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const booking = await Order.create({
    restaurant_id,
    date,
    seat: seats,
    customer_id: session?.user.id,
    created_at: new Date(),
  });

  if (!booking) {
    return NextResponse.json(
      { error: "Error while creating booking" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { success: "Booking created successfully" },
    { status: 201 }
  );
}
