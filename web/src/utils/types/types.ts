import { title } from "process";

export type THeaderProps = {
    title: string
}

export type IBGEUFResponse = {
    sigla: string
}

export type IBGECITYResponse = {
    nome: string
}

export type LoadingProps = {
    isLoading: boolean
}

export type TUsersGroup = {
    name: string,
    nickname: string
}

export type TGroup = {
    id: number
    name: string
    date: string
    description: string
    occupation_area: string
    rules: string
    image_url: string
}

export type TPost = {
    id: number
    id_group: number
    contents: string
    date: Date
    like: number
    ban: boolean
    coments: Array<TComent>
    attachment: Array<TAttachments>
    user: TUser
}

export type TComent = {
    id: number
    id_post: number
    contents: string
    date: Date
    user: TUser
}

export type TAttachments = {
    id: number
    id_post: number
    url: string
}

export type TUser = {
    name: string
    image_url: string
    registration: string
    city: string
    uf: string
    latitude: number
    longitude: number
    birth: string
    course: string
    whatsapp: string
    email: string
    password: string
    description: string
}