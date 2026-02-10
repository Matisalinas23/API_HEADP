import { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"

export const getImages = async(req: Request, res: Response): Promise<void> => {
    try {
        const images = await prisma.image.findMany()
        console.log("Images: ", images)

        res.status(200).json(images)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const updateImage = async(req: Request, res: Response): Promise<void> => {
    try {
        const updatedImage = await prisma.image.update({
            where: { id: Number(req.params.id) },
            data: { name: req.body.name }
        })

        res.status(200).json(updatedImage)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}