import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import "@/app/models/relationships";
import { Customer } from "@/app/models/customer";
import { Restaurant } from "@/app/models/restaurant";
import { CustomerRole } from "@/app/models/customer_role_restaurant";

export async function GET(request: any, params: any) {
  const {
    params: { id },
  } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.id !== parseInt(id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const customers = await Customer.findAll({
        include: [
          {
            model: CustomerRole,
            include: [
              {
                model: Restaurant,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        attributes: ["id", "firstname", "lastname", "email", "avatar", "created_at"],
      });
    if (!customers) {
      return NextResponse.json(
        { error: "No customers found" },
        { status: 404 }
      );
    }
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
