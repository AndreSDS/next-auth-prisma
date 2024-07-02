import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "../prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    
  ],
});
