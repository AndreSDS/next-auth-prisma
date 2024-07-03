import Link from "next/link";

import { UserRegisterForm } from "@/components/auth/user-register-form";
import { Footer } from "@/components/footer/footer";

export default function RegistrationPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Cadastrar</h1>
        <p className="text-sm text-muted-foreground">
          Entre com seus dados de acesso
        </p>
      </div>

      <UserRegisterForm />

      <Footer />
    </div>
  );
}
