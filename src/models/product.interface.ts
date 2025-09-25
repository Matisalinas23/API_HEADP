import { ICategory } from "./category.interface";
import { Image } from "./image.interface";

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