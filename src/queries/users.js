import { User } from "@/model/user-model";
import { NextResponse } from "next/server";

export const createUser = async (user) => {
  try {
    await User.create(user);
  } catch (error) {
    //check for duplicate user
    if (error.code === 11000) {
      return new NextResponse("User already exists", {
        status: 400,
        statusText: "User already exists!",
      });
    }
  }
};
