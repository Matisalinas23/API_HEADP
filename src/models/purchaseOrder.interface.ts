import { IAddress } from "./address.interface.js";
import { IUser } from "./user.interface.js";

export interface IPurchaseOrder {
    id: number;
    orderDate: string;
    orderHour: string;
    total: number;
    subtotal: number;
    iva: number;
    userId: number; // Foreign key to User
    user?: IUser; // One-to-one relationship with User
    addressId: number; // One-to-one relationship with Address
    address?: IAddress; // One-to-one relationship with Address
}