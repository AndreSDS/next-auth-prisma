import prismaClient from "../../../../prisma-postgres/client";

export async function GET(req: Request, res: Response) {
  const users = await prismaClient.user.findMany();

  return users;
}
