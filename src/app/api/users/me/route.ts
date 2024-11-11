/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectDB(); //call the database every function we create we have need to call the databse everytime.
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
          success: true,
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      user,
    },{status:200});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
