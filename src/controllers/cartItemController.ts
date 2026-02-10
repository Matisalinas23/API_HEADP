import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { CartItem } from "@prisma/client";

export const getCartItemsByUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    try {
        const cartItem = await prisma.cartItem.findMany({
            where: { userId: Number(id) },
            include: {
                product: {
                    select: {
                        name: true,
                        price: true,
                        image: true,
                        quantity: true,
                    },
                },
            },
        });
    
        res.status(200).json(cartItem)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' })
    }
}

export const createCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId} = req.params

        const cartItem: CartItem = await prisma.cartItem.create({
            data: {
                user: { connect: { id: Number(userId) } },
                product: { connect: { id: Number(productId) } },
            },
            include: {
                product: {
                        select: {
                            name: true,
                            price: true,
                        }
                    }
            }
        })

        res.status(201).json(cartItem)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear cart item' })
    }
}

export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    const cartId = Number(id)
    
    try {
        await prisma.cartItem.delete({
            where: { id: cartId }
        })

        res.status(200).json({ message: "El producto ha sido removido del carrito exitosamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error intentar remover el producto del carrito" })
    }
}