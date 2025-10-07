import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                product:{
                    select: {
                        name: true,
                        price: true
                    }
                }
            }
        })

        res.status(200).json(sales)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const clearSales = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.sale.deleteMany({})

        res.status(200).json({ message: "All sales was deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}