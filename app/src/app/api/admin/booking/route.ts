import { NextResponse } from "next/server";
import sequelize from "@/app/api/config";
import "@/app/models/relationships";
import { CustomerRole } from "@/app/models/customer_role_restaurant";
import { Order } from "@/app/models/order";
import { Customer } from "@/app/models/customer";
import { Restaurant } from "@/app/models/restaurant";

export async function GET(req: any, params: any) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "";
  if (userId.length === 0) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const result = await sequelize.transaction(async (t: any) => {
      const user = await CustomerRole.findAll({
        where: {
          customer_id: userId,
        },
        transaction: t,
      });
      if (user.length === 0) {
        return NextResponse.json({
          error: "No Restaurants fond for this user",
        });
      }
      const restaurant_ids = user.map((users: any) => users.restaurant_id);
      const booking = await Order.findAll({
        where: {
          restaurant_id: restaurant_ids,
        },
        include: [
          Customer,
          {
            model: Restaurant,
            attributes: ["id", "name"],
          },
        ],
      });
      return booking;
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(req: any) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "";
  const body = await req.json();

  if (!body.order_id || !body.seat || !body.status) {
    return NextResponse.json(
      { error: "Order ID, Seat and Status are required" },
      { status: 400 }
    );
  }
  try {
    const order = await Order.findOne({
      where: {
        id: body.order_id,
      },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    await order.update({
      seat: body.seat,
      status: body.status,
      updated_at: new Date(),
    });

    return NextResponse.json({ success: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: any) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "";
  const order_id = searchParams.get("order_id") || "";
  try {
    const order = await Order.findOne({
      where: {
        id: order_id,
      },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    await order.destroy();
    return NextResponse.json({ success: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
