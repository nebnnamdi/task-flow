import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { User } from "@/model/user-model";

export async function POST(req) {
  const data = await req.json();

  const { password, token } = data;

  try {
    //hash incoming token
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    //find user by reset token
    const user = await User.findOne({
      resetToken: hashedResetToken,
      resetTokenExpiry: { $gt: Date.now() },
    }).lean();

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Token invalid or expired!" },
        { status: 400 },
      );
    }

    //hash password and update user password
    const hashedPassword = await bcrypt.hash(password, 5);

    //update user
    const res = await User.findOneAndUpdate(
      { resetToken: hashedResetToken },
      { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    ).lean();

    if (!res) {
      return NextResponse.json(
        { ok: false, message: "Error updating password" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error({ error });
  }
}
