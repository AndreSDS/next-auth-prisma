import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import prismaClient from "../../../prisma/client";
import { getenv } from "@/helpers/getenv";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const userCreadentialsSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
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
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
        username: { label: "Username", type: "text", placeholder: "Jhon Doe" },
      },
      async authorize(credentials, request): Promise<any> {
        console.log("credentials", credentials);
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
});
