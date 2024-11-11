import { connectDB } from "@/dbConfig/dbConfig";
connectDB(); //call the database every function we create we have need to call the databse everytime.
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist." },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    await sendEmail({ email, emailtype: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message:"User registered Successfully",
      success:true,
      savedUser
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
