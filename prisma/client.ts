import { PrismaClient } from "@prisma/client";
import { getenv } from "@/helpers/getenv";

const { NODE_ENV } = getenv();

declare global {
  var cachedPrisma: PrismaClient;
}

let prismaClient: PrismaClient;

if (NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  if (!globalThis.cachedPrisma) {
    globalThis.cachedPrisma = new PrismaClient();
  }

  prismaClient = globalThis.cachedPrisma;
}

export default prismaClient;
