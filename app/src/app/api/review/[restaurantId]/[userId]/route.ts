import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: any, { params } : any) {
    const { restaurantId, userId } = params;
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}