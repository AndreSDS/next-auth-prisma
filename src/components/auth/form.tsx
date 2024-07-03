"use client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icons } from "../icons";

const userAuthInputsSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type UserAuthInputs = z.infer<typeof userAuthInputsSchema>;

type FormProps = {
  onSubmit: (data: UserAuthInputs) => void;
};

export const FormLogin = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UserAuthInputs>({
    resolver: zodResolver(userAuthInputsSchema),
    mode: "all",
  });

  return (
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
            {...register("password")}
            id="password"
            placeholder="******"
            type="password"
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Entrar com
        </Button>
      </div>
    </form>
  );
};
