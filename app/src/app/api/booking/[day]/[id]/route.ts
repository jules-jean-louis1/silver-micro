import { Order } from "@/app/models/order";
import { NextResponse } from "next/server";
import { Op } from "sequelize";


export async function GET(req: any, { params }: any) {
    const { day, id } = params;
    console.log(day, id);
    if (!day || !id) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }
  
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);
  
    const BookingOfDay = await Order.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay]
        },
        restaurant_id: id
      },
      attributes: ["id", "date", "seat"], 
    });
  
    return NextResponse.json(BookingOfDay);
  }
