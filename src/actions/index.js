"use server";

import { signIn, signOut } from "@/auth";

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
