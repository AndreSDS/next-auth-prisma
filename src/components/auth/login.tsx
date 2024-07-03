"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

type Props = {
  session: Session | null;
};

export const Login = ({ session }: Props) => {
  return (
    <div>
      {!session ? (
        <Button onClick={() => signIn()}>SignIn</Button>
      ) : (
        <Button onClick={() => signOut()}>SignOut</Button>
      )}
    </div>
  );
};
