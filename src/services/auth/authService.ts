import { IUser } from "../../models/user.interface"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default-refresh-secret-key"

export const generateToken = (user: IUser): string => {
    return jwt.sign({ id: user.id, type: user.type }, JWT_SECRET, { expiresIn: '3m' })
}

export const generateRefreshToken = (user: IUser) => {
    return jwt.sign({ id: user.id, type: user.type }, JWT_REFRESH_SECRET, { expiresIn: '1d' })
}
