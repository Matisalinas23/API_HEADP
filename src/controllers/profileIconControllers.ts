import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IProfileIcon } from "../models/profileIcon.interface";
import cloudinary from "../cloudinary";
import fs from "fs";

const prisma = new PrismaClient()

export const createProfileIcon = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Subir a Cloudinary desde archivo local
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile-icons", // Carpeta opcional en Cloudinary
      public_id: req.body.name, // Nombre del archivo en Cloudinary
    });

    // Guardar en la base de datos
    const profileIcon: IProfileIcon = await prisma.profileIcon.create({
      data: {
        name: req.body.name,
        url: uploadResult.secure_url,
      },
    });

    // Eliminar archivo temporal
    fs.unlinkSync(req.file.path);

    res.status(201).json(profileIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating profile icon" });
  }
};

export const getAllProfileIcons = async (req: Request, res: Response): Promise<void>=> {
    try {
      const profileIcons = await prisma.profileIcon.findMany()
      
      res.status(201).json(profileIcons)
    } catch (error: any) {
      if (error.code === 'P2025') {
            res.status(404).json({ error: "Profile icons not found" })
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: "Duplicate value error" })
        }

      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteProfileIcon = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    try {
        // Validate id from req.params
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        
        const deletedIcon = await prisma.profileIcon.delete({
            where: { id: Number(id) }
        })

        console.log("deleted icon: ", deletedIcon)
        res.status(200).json({ message: "Icon deleted successfully" })
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

