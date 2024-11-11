/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/dbConfig/dbConfig";
connectDB();
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User loggedout successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
