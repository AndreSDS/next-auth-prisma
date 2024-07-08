import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Footer } from "@/components/footer/footer";

export default function AuthenticationPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
        <p className="text-sm text-muted-foreground">Entrar</p>
      </div>

      <UserAuthForm />

      <Footer />
    </div>
  );
}
