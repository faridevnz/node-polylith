import { User } from "../../user/resources/user.interface";

export type Article = {
    id: number,
    name: string,
    price: number,
    userId: number,
    user?: User
}