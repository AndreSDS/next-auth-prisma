import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { email, hashedPassword, name } = data;

  const userAlreadyExists = await prismaClient.user.findFirst({
    where: { email },
  });

  if (userAlreadyExists) {
    return NextResponse.json({ message: "User already exists", status: 400 });
  }

  const encryptPassword = await bcrypt.hash(hashedPassword, 10);

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
