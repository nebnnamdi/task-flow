import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/model/user-model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email }).lean();

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user?.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});
