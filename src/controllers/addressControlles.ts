import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 
import { IAddress } from '../models/address.interface';

const prisma = new PrismaClient()

export const getAllAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const allAddress: IAddress[] = await prisma.address.findMany()

        if (allAddress.length === 0) {
            res.status(404).json({ message: "No addresses found" })
            return;
        }
        console.log("Fetched address: ", allAddress)

        res.status(200).json(allAddress)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: "Address not found" })
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: "Duplicate value error" })
        }

        console.log("Error in 'getAllAddress' ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    try {
        const allAddress: IAddress = await prisma.address.delete({
            where: { id: Number(id) },
        })

        res.status(200).json(allAddress)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: "Address not found" })
        }
        
        console.log("Error in 'getAllAddress' ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}