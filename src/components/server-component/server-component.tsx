import { auth } from "@/services/auth/auth";

export const ServerComponent = async () => {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div className="bg-slate-500 border gap-2 h-60 max-w-md overflow-scroll">
          <h2>Server Component</h2>
          {JSON.stringify(session.user, null, 2)}
        </div>
      ) : null}
    </>
  );
};
