import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllSales = async (req: Request, res: Response): Promise<void> => {

    try {
        const sales = await prisma.sale.findMany()

        res.status(200).json(sales)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}