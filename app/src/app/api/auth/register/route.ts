import { NextResponse } from "next/server";
import { Customer } from "@/app/models/customer";
import sequelize from "@/app/api/config";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword } from "@/app/utils/validateForm";

sequelize.sync();

export async function POST(request: any) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (
      body.firstname.length === 0 ||
      body.lastname.length === 0 ||
      body.email.length === 0 ||
      body.password.length === 0 ||
      body.passwordConfirm.length === 0
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
    if (!validatePassword(body.password)) {
      return NextResponse.json(
        {
          error:
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
        },
        { status: 400 }
      );
    }
    if (body.password !== body.passwordConfirm) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }
    const customerExists = await Customer.findOne({
      where: { email: body.email },
    });
    if (customerExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    const role = ["USER_CLIENT"];
    const roleString = JSON.stringify(role);

    const customer = await Customer.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: hash,
      role: roleString,
      created_at: new Date(),
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Failed to create customer" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: "Customer created successfully" }, { status: 201 });
    }

  } catch (error) {
    console.log("errorLog", error);
    return Response.json({ error }, { status: 500 });
  }
}
