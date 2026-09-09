import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongo";
import { Project } from "@/model/user-model";

export const GET = async (req, { params }) => {
  const { id } = await params;

  try {
    //connect to the db
    dbConnect();

    //find user
    const user = await Project.findOne({ _id: id }).lean();

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
