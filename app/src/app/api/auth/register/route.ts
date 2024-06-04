import { NextResponse } from "next/server";
import { Customer } from "@/app/models/customer";
import sequelize from "@/app/api/config";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword } from "@/app/utils/validateForm";
import "@/app/models/relationships";

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
      return NextResponse.json({ error: "Veuillez remplir tous les champs." }, { status: 400 });
    }
    if (body.firstname.length < 2 || body.firstname.length > 55) {
      return NextResponse.json(
        { error: "Prénom doit être entre 2 et 55 caractères" },
        { status: 400 }
      );
    }
    if (body.lastname.length < 2 || body.lastname.length > 55) {
      return NextResponse.json(
        { error: "Nom doit être entre 2 et 55 caractères" },
        { status: 400 }
      );
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Email invalide"}, { status: 400 });
    }
    if (!validatePassword(body.password)) {
      return NextResponse.json(
        {
          error:
            "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
        },
        { status: 400 }
      );
    }
    if (body.password !== body.passwordConfirm) {
      return NextResponse.json(
        { error: "Les mots de passe ne correspondent pas" },
        { status: 400 }
      );
    }
    const customerExists = await Customer.findOne({
      where: { email: body.email },
    });
    if (customerExists) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    const customer = await Customer.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: hash,
      created_at: new Date(),
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Failed to create customer" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ success: "Customer created successfully" }, { status: 201 });
    }

  } catch (error) {
    console.log("errorLog", error);
    return Response.json({ error }, { status: 500 });
  }
}
