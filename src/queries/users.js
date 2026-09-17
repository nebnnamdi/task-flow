import { User, Project, Task } from "@/model/user-model";
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

export const createProject = async (project) => {
  try {
    await Project.create(project);
  } catch (error) {
    return new NextResponse("Error creating project", {
      status: 401,
      statusText: "Error creating project",
    });
  }
};

export const createTask = async (task) => {
  try {
    await Task.create(task);
  } catch (error) {
    return new NextResponse("Error creating task", {
      status: 401,
      statusText: "Error creating task",
    });
  }
};
