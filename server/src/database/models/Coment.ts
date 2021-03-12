import { TUser } from "./User";

export type TComent = {
    id: number
    id_post: number
    id_user: number
    contents: string
    date: Date
    user: TUser
}