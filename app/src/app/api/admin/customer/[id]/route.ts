import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CustomerRole } from "@/app/models/customer_role_restaurant";
import { canMangeUser } from "@/app/utils/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  const { id } = params;
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const isAuthorized = canMangeUser(session!, body.restaurant_id); // Add '!' to assert that session is not null

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await CustomerRole.create({
    customer_id: id,
    restaurant_id: body.restaurant_id,
    role: body.role,
  });

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: "Create User role" }, { status: 200 });
}

export async function PUT(req: any, { params }: any) {
  const { id } = params;
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const isAuthorized = canMangeUser(session!, body.restaurant_id);

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await CustomerRole.update(
    { role: body.role },
    { where: { customer_id: id, restaurant_id: body.restaurant_id } }
  );

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: "Update User role" }, { status: 200 });
}

export async function DELETE(req: any, { params }: any) {
  const { id } = params;
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const isAuthorized = canMangeUser(session!, body.restaurant_id); 

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await CustomerRole.destroy({
    where: { customer_id: id, restaurant_id: body.restaurant_id },
  });

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: "Delete User role" }, { status: 200 });
}