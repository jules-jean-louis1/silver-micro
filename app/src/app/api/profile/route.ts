import { NextResponse } from "next/server";
import { Customer } from "@/app/models/customer";
import sequelize from "@/app/api/config";
import bcrypt from "bcryptjs";
import { validateEmail } from "@/app/utils/validateForm";
import "@/app/models/relationships";
import { UpdatedAt } from "sequelize-typescript";

sequelize.sync();

export async function PUT(request: any) {
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (
      body.firstname.length === 0 ||
      body.lastname.length === 0 ||
      body.email.length === 0
    ) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }
    if (body.firstname.length < 2 || body.firstname.length > 55) {
      return NextResponse.json(
        { error: "Firstname must be between 2 and 55 characters" },
        { status: 400 }
      );
    }
    if (body.lastname.length < 2 || body.lastname.length > 55) {
      return NextResponse.json(
        { error: "Lastname must be between 2 and 55 characters" },
        { status: 400 }
      );
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const customer = await Customer.update(
      {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        updated_at: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      },
      {
        where: { email: body.email },
      }
    );
    const customerExists = await Customer.findOne({
      where: { email: body.email },
    });
    if (customerExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    if (!customer) {
      return NextResponse.json(
        { error: "Failed to update customer" },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Customer updated successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("errorLog", error);
    return Response.json({ error }, { status: 500 });
  }
}
