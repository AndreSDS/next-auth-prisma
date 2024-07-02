"use client";
import { useSession } from "next-auth/react";
import { Login } from "./auth/login";

export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav>
      <Login session={session} />
    </nav>
  );
};
