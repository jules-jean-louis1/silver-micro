import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    await customer.destroy();
    return NextResponse.json({ success: "Customer deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
