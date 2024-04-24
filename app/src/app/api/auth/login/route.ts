import { NextResponse } from "next/server";
import { Customer } from "@/app/models/customer";
import sequelize from "@/app/api/config";
import bcrypt from "bcryptjs";

sequelize.sync();

export async function POST(request:any) {
    try {
        const data = await request.json();
        if (!data) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        if (!data.email || !data.password) {
            return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
        }
        const customer = await Customer.findOne({ where: { email: data.email } });
        if (!customer) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }
        const validPassword = await bcrypt.compare(data.password, customer.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }
        return NextResponse.json({ message: "Logged in successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error }, { status: 500 });
    }
}