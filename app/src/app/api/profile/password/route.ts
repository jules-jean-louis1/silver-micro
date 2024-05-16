import { NextResponse } from "next/server";
import { Customer } from "@/app/models/customer";
import sequelize from "@/app/api/config";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/app/utils/validateForm";
import "@/app/models/relationships";

sequelize.sync();

export async function PUT(request: any) {
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (
      body.password.length === 0 ||
      body.confirmPassword.length === 0
    ) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
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
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    const customer = await Customer.update(
    {
      password: hash,
      updated_at: new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
    },
    {
      where: { id : body.id }
    }
    
    );

    if (!customer) {
      return NextResponse.json(
        { error: "Failed to update customer" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: "Customer updated successfully" }, { status: 201 });
    }

  } catch (error) {
    console.log("errorLog", error);
    return Response.json({ error }, { status: 500 });
  }
}
