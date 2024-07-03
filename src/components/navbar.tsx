import { auth } from "@/services/auth/auth";
import { Login } from "./auth/login";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between bg-yellow-500 p-3">
      <Link className="flex mx-2 gap-2 items-center" href="/">
        Home
      </Link>
      <Login session={session} />
    </nav>
  );
};
