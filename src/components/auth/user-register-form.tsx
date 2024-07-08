"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const userResgisterSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  hashedPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
});

export type UserRegisterInputs = z.infer<typeof userResgisterSchema>;

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UserRegisterInputs>({
    resolver: zodResolver(userResgisterSchema),
    mode: "all",
  });

  const onSubmit = async (data: UserRegisterInputs) => {
    try {
      const reqBody = userResgisterSchema.safeParse(data);

      const request = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody.data),
      });

      const response = await request.json();

      if (response.status >= 400) {
        throw new Error(response.message);
      }

      router.push("/signIn");
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Error",
        description: `Erro ao criar usuário. ${err.message}`,
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
              id="hashedPassword"
              placeholder="******"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />

            <Input
              {...register("name")}
              id="name"
              placeholder="name"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
