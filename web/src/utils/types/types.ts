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