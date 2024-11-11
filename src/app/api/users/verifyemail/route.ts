/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDB(); //call the database every function we create we have need to call the databse everytime.

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      varifyToken: token,
      varifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Token",
          success: false,
        },
        { status: 400 }
      );
    }
    console.log(user);
    // cleanup and updateion
    user.isVarified = true;
    user.varifyToken = undefined;
    user.varifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      {
        message: "user verified successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
