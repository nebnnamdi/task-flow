"use server";

import { signIn, signOut, auth } from "@/auth";
import mongoose from "mongoose";
import { User, Project, Task } from "@/model/user-model";
import { revalidatePath } from "next/cache";

export async function login(formData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    //catching authjs errors
    if (error.name === "AuthError" || error.type) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Invalid credentials. Check and try again!",
          };
        default:
          return {
            success: false,
            error: "Authentication failed, please try again.",
          };
      }
    }

    //catching avoid getting stuck on a blank page after success
    if (error instanceof Error && error.digest?.startsWith(NEXT_REDIRECT)) {
      throw error;
    }

    //catch db errors
    return { success: false, error: "An unexpected system error occurred." };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function getSession() {
  return auth();
}

export async function getAllUsers() {
  const users = await User.find({}).select("-password").lean();

  return users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));
}

export async function getAllProjects() {
  try {
    const projects = await Project.find({}).sort({ _id: -1 }).lean();
    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }));
  } catch (error) {
    console.log({ error });
  }
}

export async function deleteProject(id) {
  try {
    await Project.deleteOne({ _id: id });

    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    return { error };
  }
}

export async function getAllTasks() {
  try {
    const tasks = await Task.find({}).sort({ _id: -1 }).lean();

    return tasks.map((task) => ({ ...task, _id: task._id.toString() }));
  } catch (error) {
    console.log({ error });
  }
}

export async function updateTaskStatus(id, newStatus) {
  try {
    const response = await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { status: newStatus },
      { returnDocument: "after", runValidators: true },
    ).lean();

    if (!response) {
      return { success: false, error: "Error updating task status" };
    }

    revalidatePath("/dashboard/tasks");
    return {
      success: true,
      data: { ...response, _id: response._id.toString() },
    };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(data) {
  const { name, email } = data;
  try {
    const response = await User.findOneAndUpdate(
      { email: email },
      { name: name },
      { returnDocument: "after", runValidators: true },
    )
      .select("-password")
      .lean();

    if (!response) {
      return { success: false, error: "Error updating user details" };
    }

    revalidatePath("/dashboard/settings");
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {}
}
