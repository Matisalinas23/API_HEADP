import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/password.service";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../services/authService";
import { validateBirthday } from "../services/validateBirthday";

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, lastname, email, password, dni, birthday, type, address } = req.body;

    try {
        // Validate required fields
        if (!type) {
            if (!email || !password || !name || !lastname || !dni || !birthday || !address){
                res.status(400).json({ error: "Email, password, name, lastname, dni and birthday are required" });
                return;
            }
        } else {
            if (!email || !password || !name || !lastname || !dni || !birthday) {
                res.status(400).json({ error: "Email, password, name, lastname, dni and birthday are required" });
                return;
            }
        }

        const validatedBirthday = validateBirthday(birthday)
        if (validatedBirthday === null) {
            res.status(400).json({ error: "Birthday must be a valid format (dd/mm/yyyy) and you must have 12 years or older" })
        }

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            res.status(500).json({ error: "Error hashing password" });
            return;
        }
        console.log("hashed password: " + hashedPassword)

        let newUser: any
        let newAddress: any

        // Create new user
        await prisma.$transaction(async (tx) => {
            newUser = await tx.user.create({
                data: {
                    name,
                    lastname,
                    email,
                    password: hashedPassword,
                    dni,
                    birthday,
                    type: type ? type : "CLIENT" ,
                    purchaseOrders: { create: [] }
                },
                include: {
                    purchaseOrders: true
                }
            });

            if (!type) {
                // Crear dirección
                newAddress = await tx.address.create({
                    data: {
                        particularAddress: address.particularAddress,
                        city: address.city,
                        province: address.province,
                        country: address.country,
                        userId: newUser.id
                    }
                });
            }
        });

        // Generate token
        const token = generateToken(newUser);
        res.status(201).json({ token });
    } catch (error: any) {
        console.log(error);

        // Handle specific error cases
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(409).json({ error: "Email already exists" });
        }

        res.status(500).json({ error: "there was an error in register" });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Validate required fields
        if (!password || !email) {
            res.status(400).json({ error: "email and password are required" })
            return;
        }

        // Find user by email and validate it
        const userLoged = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                purchaseOrders: true
            }
        })

        // Check if user exists
        if (!userLoged) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        
        // Compare password from request with password from database
        const passwordMatch = await comparePassword(password, userLoged.password)

        if (!passwordMatch) {
            res.status(401).json({ error: "Password or email are incorrect" });
            return;
        }

        const token = generateToken(userLoged)
        res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "there was an error in login" });
    }
}