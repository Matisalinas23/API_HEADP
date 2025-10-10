import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client";
import { IUser } from "../models/user.interface";

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all users with related data
        const users = await prisma.user.findMany({
            include: {
                purchaseOrders: true,
                address: true,
                profileIcon: true
            }
        });

        console.log("Fetched users: ", users);
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

        console.log("Fetched user: ", user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, lastname, email, purchaseOrders, type } = req.body;
    console.log("Query body: ", req.body)

    try {
        // Validate id from req.params
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        console.log("Updating user with ID: ", id);

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
        console.log("Updated user: ", updatedUser);

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
        // Validate id from req.params
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        console.log("Deleting user with ID: ", id);

        // Delete user
        const deletedUser = await prisma.user.delete({
            where: { id: Number(id) }
        });
        console.log("Deleted user: ", deletedUser);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        console.log(error);

        // Handle specific error cases
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
    const { profileIcon } = req.body

    try {
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid user ID" })
            return;
        }
        if (!profileIcon.id || isNaN(Number(profileIcon.id))) {
            res.status(400).json({ error: "Invalid profileIcon ID" })
            return;
        }
        console.log("user id: ", id)
        console.log("profile icon id: ", profileIcon.id)

        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: {
                profileIcon: {
                    connect: { id: Number(profileIcon.id) }
                }
            },
            include: {
                profileIcon: true
            }
        })
        console.log("Profile icon added in user: ", updatedUser)

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