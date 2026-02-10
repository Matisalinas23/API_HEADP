import { IPurchaseOrder } from "./purchaseOrder.interface.js";
import { IUser } from "./user.interface.js";

export interface IAddress {
    id: number;
    particularAddress: string;
    city: string;
    province: string;
    country: string;
    userId: number; // Foreign key to User
    user?: IUser; // Optional relationship with User
    purchaseOrders?: IPurchaseOrder[]; // One-to-many relationship with PurchaseOrder
}