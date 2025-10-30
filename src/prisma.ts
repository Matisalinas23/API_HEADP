import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("in prisma.ts")

async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    setTimeout(connectPrisma, 5000);
  }
}

connectPrisma();

export default prisma;