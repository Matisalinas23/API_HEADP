import { IUser } from "../models/user.interface"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key"

export const generateToken = (user: IUser): string => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
}