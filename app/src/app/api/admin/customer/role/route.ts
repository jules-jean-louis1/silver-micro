import { NextResponse } from "next/server";
import { CustomerRole } from "@/app/models/customer_role_restaurant";
import { Customer } from "@/app/models/customer";
import "@/app/models/relationships";
import exp from "constants";

export async function GET(request: any) {
  const roles = await CustomerRole.findAll({
    include: Customer,
  });
  return NextResponse.json(roles);
}

export async function POST(request: any) {
    try {
        const data = await request.json();
        if (!data) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }
        if (!data.customer_id || !data.restaurant_id || !data.role) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        await CustomerRole.create(data);
        return NextResponse.json({message : "Change role successful" }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: any) {
    try {
        const data = await request.json();
        if (!data) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }
        if (!data.customer_id || !data.restaurant_id || !data.role) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        const role = await CustomerRole.findOne({
            where: {
                customer_id: data.customer_id,
                restaurant_id: data.restaurant_id,
            },
        });
        if (!role) {
            return NextResponse.json({ error: "Role not found" }, { status: 404 });
        }
        await role.update(data);
        return NextResponse.json({ message: "Role updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

