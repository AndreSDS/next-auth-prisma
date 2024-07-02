"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface AuthSessionProviderProps {
  children: ReactNode;
  session: any;
}

export const AuthSessionProvider = ({
  children,
  session,
}: AuthSessionProviderProps) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {children}
    </SessionProvider>
  );
};
