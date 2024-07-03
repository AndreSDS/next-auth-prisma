import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import prismaClient from "../../../prisma-postgres/client";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

import { getenv } from "@/helpers/getenv";
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET,
  AUTH_SECRET,
  NODE_ENV,
} = getenv();

const creadentialsSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GitHubProvider({
      clientId: AUTH_GITHUB_ID,
      clientSecret: AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jhonDoe@remail.com",
        },
        password: { label: "Password", type: "password", placeholder: "******"},
        username: { label: "Username", type: "text", placeholder: "Jhon Doe" },
      },
      async authorize(credentials, request): Promise<any> {
        const result = creadentialsSchema.safeParse(credentials);
        if (!result.success) return null;

        const response = await fetch(request);
        if (!response.ok) return null;
        return (await response.json()) ?? null;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: AUTH_SECRET,
  debug: process.env.NODE_ENV === NODE_ENV,
});
