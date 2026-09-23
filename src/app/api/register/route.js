import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import bcrypt from "bcrypt";
import { createUser } from "@/queries/users";

export const POST = async (req) => {
  const data = await req.json();

  const { name, email, password } = data;

  //connect to the db
  await dbConnect();

  //hash password
  const hashedPassword = await bcrypt.hash(password, 5);

  //create payload
  const newUser = {
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  };

  //update db
  try {
    const response = await createUser(newUser);

    if (response.status !== 201) {
      return response;
    }
  } catch (error) {
    console.error({ error });
  }

  return NextResponse.json(
    { ok: true, message: "Registration successful!" },
    {
      status: 201,
    },
  );
};
