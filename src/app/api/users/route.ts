import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "../../../../prisma/client";
import { UserCredentials } from "@/services/auth/auth";
import { UserRegisterInputs } from "@/components/auth/user-register-form";

export async function POST(req: NextRequest) {
  const data = (await req.json()) as UserRegisterInputs;

  const { email, hashedPassword, name } = data;

  const userAlreadyExists = await prismaClient.user.findFirst({
    where: { email },
  });

  if (userAlreadyExists) {
    return NextResponse.json({ message: "User already exists", status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  if (!salt) {
    return NextResponse.json({ message: "Error creating user", status: 500 });
  }

  const encryptPassword = await bcrypt.hash(hashedPassword, salt);

  const user = await prismaClient.user.create({
    data: {
      email,
      hashedPassword: encryptPassword,
      name,
    },
  });

  return NextResponse.json({
    message: `User ${user.name} created successfully.`,
  });
}
