import { IAddress } from "./address.interface";
import { IProfileIcon } from "./profileIcon.interface";
import { IPurchaseOrder } from "./purchaseOrder.interface"; 

type Enum = "ADMIN" | "CLIENT"

export interface IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    dni: string;
    birthday: string;
    type: Enum;
    profileIcon?: IProfileIcon | null; // One-to-one relationship with ProfileIcon
    address?: IAddress | null; // One-to-one relationship with Address
    purchaseOrders: IPurchaseOrder[]; // One-to-many relationship with PurchaseOrder
}