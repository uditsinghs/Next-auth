import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailtype, userId }: unknown) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10); // generate and hashed token
    // update varify &ResetTokren token and expirydate in database
    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId,{$set:{
        varifyToken: hashedToken,
        varifyTokenExpiry: Date.now() + 3600000,
      }});
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {$set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      }});
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b35ce8869a4802",
        pass: "099908ddfce269",
      },
    });
    const mailOptions = {
      from: "udit@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY" ? "Verify Your Password" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> here</a> to ${
        emailtype === "VERIFY" ? "Verify Your Password" : "Reset Your Password"
      }or copy and paste the link below  in your  browser.
      <br>
  ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      <p/>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
