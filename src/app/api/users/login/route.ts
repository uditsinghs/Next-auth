/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/dbConfig/dbConfig";
connectDB(); //call the database every function we create we have need to call the databse everytime.
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist." },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid crendentials." },
        { status: 400 }
      );
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "2d",
    });
    console.log(token);
    
    const response = NextResponse.json({
      message: "User loggedIn successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
