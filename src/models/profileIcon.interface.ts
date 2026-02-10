import { IUser } from "./user.interface.js";

export interface IProfileIcon {
    id: number;
    name: string;
    url: string;
    userId?: number | null; // foreign key to User
    user?: IUser | null; // optional, for relation
}