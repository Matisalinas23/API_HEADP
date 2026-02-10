import { Image } from "@prisma/client"
import { ICategory } from "./category.interface.js"

export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    quantity: number
    categories: ICategory[],
    image: Image | null
}