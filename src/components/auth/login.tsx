"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

export const Login = ({ session }: Props) => {
  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>SignIn</button>
      ) : (
        <button onClick={() => signOut()}>SignOut</button>
      )}
    </div>
  );
};
