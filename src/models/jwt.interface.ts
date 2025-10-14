export interface jwtPayload {
    userId: number;
    type: "ADMIN" | "CLIENT"
}