import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { createTask } from "@/queries/users";

export const POST = async (req) => {
  const data = await req.json();
  try {
    //db connect
    await dbConnect();

    //create project
    const response = await createTask(data);

    if (response.status !== 201) {
      return response;
    }
  } catch (error) {
    if (error.status) {
      return new NextResponse("Error creating project", { status: 400 });
    }
  }

  return new NextResponse("Project created successfully", { status: 201 });
};
