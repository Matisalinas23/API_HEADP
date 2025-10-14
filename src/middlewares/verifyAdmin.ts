import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { jwtPayload } from "../models/jwt.interface";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        console.log("Can not find autorization header.")
        return res.status(401).json({ error: "Can not find autorization." })
    }

    const token = req.headers.authorization.split(" ")[1]

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;

        if (decoded.type !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }

}
