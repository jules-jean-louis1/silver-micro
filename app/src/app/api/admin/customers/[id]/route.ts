import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import sequelize from "@/app/api/config";
import "@/app/models/relationships";
import { Customer } from "@/app/models/customer";
import { Restaurant } from "@/app/models/restaurant";
import { CustomerRole } from "@/app/models/customer_role_restaurant";
import { Favorite } from "@/app/models/customer_favorite";
import { Order } from "@/app/models/order";

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
      attributes: [
        "id",
        "firstname",
        "lastname",
        "email",
        "avatar",
        "created_at",
      ],
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

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: number;
    };
  }
) {
  const body = await request.json();
  const role = body.role;
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.roles.some((role: any) => role.role === "superadmin")) {
    return NextResponse.json({ error: "Access denied" }, { status: 404 });
  }
  if (!id) {
    return NextResponse.json({ error: "No id" }, { status: 404 });
  }
  if (role === "superadmin") {
    return NextResponse.json(
      { error: "Cannot delete superadmin" },
      { status: 404 }
    );
  }

  try {
    const result = await sequelize.transaction(async (t: any) => {
      const customer = await Customer.findByPk(id, { transaction: t });
      console.log("Customer fetched");
      if (!customer) {
        throw new Error("Customer not found");
      }
      await CustomerRole.destroy(
        {
          where: {
            customer_id: id,
          },
        },
        { transaction: t }
      );

      await Favorite.destroy({
        where: {
          customer_id: id,
        },
        transaction: t,
      });
      await Order.destroy({
        where: {
          customer_id: id,
        },
        transaction: t,
      });
      await customer.destroy({ transaction: t });
      return { success: "Customer deleted" };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
