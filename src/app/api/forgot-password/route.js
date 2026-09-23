import { NextResponse } from "next/server";
import crypto from "crypto";

import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export async function POST(req) {
  const data = await req.json();
  const { email } = data;

  try {
    //db connect
    await dbConnect();

    //find user
    const user = await User.findOne({ email: email }).lean();

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Invalid email!" },
        { status: 400 },
      );
    }

    //create reset token and hash
    const rawResetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(rawResetToken)
      .digest("hex");

    const res = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        resetToken: hashedResetToken,
        resetTokenExpiry: Date.now() + 3600000, // 1 hour
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).lean();

    if (!res) {
      return NextResponse.json(
        { ok: false, message: "Something went wrong!" },
        { status: 500 },
      );
    } else {
      const resetUrl = `/reset-password/${rawResetToken}`;

      return NextResponse.json({ userExists: true, resetUrl }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
