import { TAttachments } from "./Attachment";
import { TComent } from "./Coment";

export type TPost = {
    id: number
    id_group: number
    contents: string
    date: Date
    like: number
    ban: boolean
    coments: Array<TComent>
    attachment: Array<TAttachments>
}