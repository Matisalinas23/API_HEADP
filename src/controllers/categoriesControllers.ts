import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const createCategorie = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body

    try {
        if (!name) {
            res.status(400).json({ error: "name is required" })
            return;
        }

        const category = await prisma.category.create({
            data: {
                name
            }
        })

        res.status(201).json(category)
    } catch (error: any) {
        console.log(error)

        if (error.code === "P2002") {
            res.status(409).json({ error: "name must be unique. Pleas, try with other name for this category" })
            return;
        }

        res.status(500).json({ error: "Internal server error" })
    }
}

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await prisma.category.findMany({})
        
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}