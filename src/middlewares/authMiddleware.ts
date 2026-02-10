import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { jwtPayload } from "../models/jwt.interface.js";


const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

export const authMiddleware = (req: Request & { userId?: number }, res: Response, next: NextFunction ): void => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwtPayload;
    req.userId = decoded.userId;
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid Auth Token" })
  }
}