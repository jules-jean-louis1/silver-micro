import { Order } from "@/app/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number; orderId: number } }
) {
  const id = params.id;
  const order_id = params.orderId;
  if (!id) {
    return NextResponse.json({ error: "No id" }, { status: 404 });
  }
  try {
    await Order.destroy({
      where: {
        customer_id: id,
        id: order_id,
      },
    });
    return NextResponse.json({ success: "Booking Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
