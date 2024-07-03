import { PrismaClient } from "@prisma/client";
import { getenv } from "@/helpers/getenv";

const { NODE_ENV } = getenv();

const prismaClient: PrismaClient =
  globalThis.prismaClient || new PrismaClient();
if (NODE_ENV !== "production") {
  globalThis.prismaClient = prismaClient;
}

export default prismaClient;
