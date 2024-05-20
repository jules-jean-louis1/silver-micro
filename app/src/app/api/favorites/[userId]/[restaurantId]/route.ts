import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "@/app/models/relationships";
import { Favorite } from "@/app/models/customer_favorite";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  const { userId, restaurantId } = params;
  if (!userId || !restaurantId) {
    return NextResponse.json(
      { error: "User ID and Restaurant ID are required" },
      { status: 400 }
    );
  }
  try {
    const favorite = await Favorite.findOne({
      where: {
        customer_id: userId,
        restaurant_id: restaurantId,
      },
    });
    if (!favorite) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(favorite);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  const { userId, restaurantId } = params;
  if (!userId || !restaurantId) {
    return NextResponse.json(
      { error: "User ID and Restaurant ID are required" },
      { status: 400 }
    );
  }
  const session = await getServerSession(authOptions);

  if (session?.user.id !== parseInt(userId)) {
    return NextResponse.json(
      { error: "User ID does not match session user ID" },
      { status: 403 }
    );
  }
  try {
    const favorite = await Favorite.findOne({
      where: {
        customer_id: userId,
        restaurant_id: restaurantId,
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 200 }
      );
    }

    await favorite.destroy();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: any, { params }: any) {
  const { userId, restaurantId } = params;
  if (!userId || !restaurantId) {
    return NextResponse.json(
      { error: "User ID and Restaurant ID are required" },
      { status: 400 }
    );
  }
  const session = await getServerSession(authOptions);

  if (session?.user.id !== parseInt(userId)) {
    return NextResponse.json(
      { error: "User ID does not match session user ID" },
      { status: 403 }
    );
  }
  try {
    const favorite = await Favorite.create({
      customer_id: userId,
      restaurant_id: restaurantId,
      created_at: new Date(),
    });
    if (!favorite) {
      return NextResponse.json(
        { error: "An error occurred" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}