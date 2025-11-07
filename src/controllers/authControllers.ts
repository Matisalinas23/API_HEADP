import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/auth/password.service";
import { PrismaClient } from "@prisma/client";
import { generateRefreshToken, generateToken } from "../services/auth/authService";
import { validateBirthday } from "../services/validateBirthday";
import jwt from 'jsonwebtoken'
import { IUser } from "../models/user.interface";

const prisma = new PrismaClient()
const refreshTokens: string[] = [];

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, lastname, email, password, dni, birthday, type, address } = req.body;

    try {
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
            res.status(400).json({ error: "Birthday must be a valid format (dd/mm/yyyy) and you must have 12 years or oldder" })
        }

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            res.status(500).json({ error: "Error hashing password" });
            return;
        }
        
        let newUser: any
        let newAddress: any

        // Use transactional to create user and address at the same time
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

        const token: string = generateToken(newUser);
        const userId: string = newUser.id
        res.status(201).json({ token, userId });
    } catch (error: any) {
        console.log(error);

        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(409).json({ error: "Email already exists" });
        }

        res.status(500).json({ error: "there was an error in register" });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if (!password || !email) {
            res.status(400).json({ error: "email and password are required" })
            return;
        }

        const userLoged = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                purchaseOrders: true
            }
        })

        if (!userLoged) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        
        const passwordMatch = await comparePassword(password, userLoged.password)

        if (!passwordMatch) {
            res.status(401).json({ error: "Password or email are incorrect" });
            return;
        }

        const accessToken = generateToken(userLoged)
        const refreshToken = generateRefreshToken(userLoged)

        refreshTokens.push(refreshToken)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development' ? false : true,
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userId = userLoged.id
        res.status(201).json({ accessToken, userId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "there was an error in login" });
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default-refresh-secret-key"

export const refresh = (req: Request, res: Response) => {
    const token = req.cookies.refreshToken

    jwt.verify(token, JWT_REFRESH_SECRET, (err: any, user: any) => {
        if (err) {
            console.log("Token not refreshed")
            return res.status(403).json({ message: "Invalid or expired refresh token" })
        }

        const accessToken = generateToken(user as IUser)
        console.log("Token refreshed")
        return res.json({ accessToken })
    })
}