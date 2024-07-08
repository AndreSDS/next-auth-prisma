import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import bcrypt from "bcrypt";
import prismaClient from "../../../prisma/client";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const userCreadentialsSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  hashedPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type UserCredentials = z.infer<typeof userCreadentialsSchema>;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jhonDoe@remail.com",
        },
        hashedPassword: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(request): Promise<any> {
        const result = userCreadentialsSchema.parse(request);
        if (!result) {
          throw new Error("Invalid credentials");
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: result.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("User not registered by credentials");
        }

        const isValidPassword = await bcrypt.compare(
          result.hashedPassword,
          user.hashedPassword
        );

        if (!isValidPassword) {
          throw new Error("User not found");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
});
