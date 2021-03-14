import { TUser } from "./User";

export type TGroup = {
    id: number
    name:   string
    image_url:string
    date: string
    description: string
    occupation_area: string
    rules: string
    users: Array<TUser>
}