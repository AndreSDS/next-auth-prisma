"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn, SignInResponse } from "next-auth/react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  hashedPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type UserAuthInputs = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UserAuthInputs>({
    resolver: zodResolver(userAuthSchema),
    mode: "all",
  });

  const onSubmit = async (data: UserAuthInputs) => {
    try {
      const response: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Error",
        description: `Erro ao logar usuário. ${err.message}`,
        variant: "destructive",
        action: (
          <ToastAction altText="tente novamente">Tente novamente</ToastAction>
        ),
      });
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />

            <Input
              {...register("hashedPassword")}
              id="password"
              placeholder="******"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar com
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        {false ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        {false ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
