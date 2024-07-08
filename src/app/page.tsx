import { ClientComponent } from "@/components/cliente-component/client-component";
import { ServerComponent } from "@/components/server-component/server-component";

export default async function Home() {
  return (
    <main className="mx-2 py-2">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="mt-2">Welcome to the home page</p>

      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
