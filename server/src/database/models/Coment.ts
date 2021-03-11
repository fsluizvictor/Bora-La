import { TUser } from "./User";

export type TComent = {
    id: number
    id_post: number
    contents: string
    date: Date
    user: TUser
}