import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client";
import { IUser } from "../models/user.interface";
import prisma from "../prisma";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
            include: {
                purchaseOrders: true,
                address: true,
                profileIcon: true
            }
        });

        res.status(200).json(users);
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: "Users not found" })
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: "Duplicate value error" })
        }

        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Validate userId
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        // Fetch user by ID with related data
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                purchaseOrders: true,
                address: true,
                profileIcon: true
            }
        });

        // Validate user
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, lastname, email, purchaseOrders, type } = req.body;

    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            name,
            lastname,
            email,
            purchaseOrders,
            type,
        },
        include: {
            profileIcon: true,
            address: true,
            purchaseOrders: true
        }
        });

        res.status(200).json(updatedUser);
    } catch (error: any) {
        console.log(error);

        if (error.code === 'P2025') {
            res.status(404).json({ message: "User not found" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateuserAddress = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { particularAddress, city, province, country } = req.body;

    try {
        if (!particularAddress || !city || !province || !country) {
            res.status(400).json({ error: "Any address atribute is not defined or is not valid" })
        }
        // Validate id from req.params
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            address: {
                update: {
                    particularAddress: particularAddress,
                    city: city,
                    province: province,
                    country: country
                }
            }
        },
        include: {
            profileIcon: true,
            address: true,
            purchaseOrders: true
        }
        });

        res.status(200).json(updatedUser);
    } catch (error: any) {
        console.log(error);

        if (error.code === 'P2025') {
            res.status(404).json({ message: "User not found" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const deletedUser = await prisma.user.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        console.log(error);

        if (error.code === 'P2003') {
            res.status(400).json({ message: "Cannot delete user with existing related data" });
            return;
        }
        if (error.code === 'P2025') {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addProfileIcon = async (req: Request, res: Response) => {
    const { id } = req.params
    const { iconId } = req.body

    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid user ID" })
            return;
        }
        if (!iconId || isNaN(Number(iconId))) {
            res.status(400).json({ error: "Invalid profileIcon ID" })
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: {
                profileIcon: {
                    connect: { id: Number(iconId) }
                }
            },
            include: {
                profileIcon: true,
                address: true,
            }
        })

        res.status(200).json(updatedUser)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: "User or profile icon not found" });
        } 
        console.log("Error in 'addProfileIcon' ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params

    try {
        if (!email) {
            res.status(400).json({ error: "Email was not sent" })
        }

        const user: IUser | null = await prisma.user.findUnique({
            where: { email: email },
            include: {
                address: true,
                profileIcon: true,
                purchaseOrders: true,
            }
        })

        if (!user) {
            res.status(404).json({ error: "User was no found" })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error in 'getUserByEmail'" })
    }
}