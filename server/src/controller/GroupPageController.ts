import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import { TAttachments } from '../database/models/Attachment'
import { TComent } from '../database/models/Coment'
import { TPost } from '../database/models/Post'
import { TUser } from '../database/models/User'
import { HTTP_CREATED, HTTP_SERVER_ERROR, HTTP_SUCCESS, IP_UPLOAD_PATH } from '../utils/consts'

class GroupPageController {

    async indexMembersGroup(request: Request, response: Response) {
        try {

            const {
                id_group
            } = request.params

            const users_group = await knex
                .select('*')
                .from('users')
                .join('users_has_groups', 'users_has_groups.id_user', 'users.id')
                .where('users_has_groups.id_group', '=', id_group)
            console.log(users_group)
            const users = users_group.map((user: TUser) => {
                return {
                    id: user.id,
                    name: user.name,
                    image_url: user.image_url,
                    registration: user.registration,
                    city: user.city,
                    uf: user.uf,
                    latitude: user.latitude,
                    longitude: user.longitude,
                    birth: user.birth,
                    course: user.course,
                    whatsapp: user.whatsapp,
                    email: user.email,
                    password: user.password,
                    description: user.description
                }
            })

            return response
                .status(HTTP_SUCCESS)
                .json(
                    users
                )

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }


    async indexPosts(request: Request, response: Response) {
        try {
            const results = await knex('posts').select('*')

            return response
                .status(HTTP_SUCCESS)
                .json({
                    results
                })

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }

    async indexAttachments(request: Request, response: Response) {
        try {
            const results = await knex('attachments').select('*')

            return response
                .status(HTTP_SUCCESS)
                .json({
                    results
                })

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }

    async indexComents(request: Request, response: Response) {
        try {
            const results = await knex('coments').select('*')

            return response
                .status(HTTP_SUCCESS)
                .json({
                    results
                })

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }

    async indexFeedPosts(request: Request, response: Response) {
        try {

            const {
                id_group
            } = request.params

            const posts = await knex('posts')
                .where('id_group', id_group)

            const coment_all = await knex('coments')
                .select('*')

            const attachment_all = await knex('attachments')
                .select('*')

            const users_all = await knex('users')
                .select('*')


            const complet_coment = coment_all.map((coment: TComent) => {

                const user = users_all.filter((user: TUser) => {
                    return user.id === coment.id_user
                })

                return {
                    id: coment.id,
                    id_post: coment.id_post,
                    contents: coment.contents,
                    date: coment.date,
                    user: {
                        id: user[0].id,
                        name: user[0].name,
                        image_url: `${IP_UPLOAD_PATH}${user[0].image}`,
                        registration: user[0].registration,
                        city: user[0].city,
                        uf: user[0].uf,
                        latitude: user[0].latitude,
                        longitude: user[0].longitude,
                        birth: user[0].birth,
                        course: user[0].course,
                        whatsapp: user[0].whatsapp,
                        email: user[0].email,
                        password: user[0].password,
                        description: user[0].description
                    }
                }
            })

            const finalPosts = posts.map((post: TPost) => {

                const coments = complet_coment.filter((coment: any) => {
                    return coment.id_post === post.id
                })

                const attachment = attachment_all.filter((element: TAttachments) => {
                    return element.id_post === post.id
                })

                const user = users_all.filter((element: TUser) => {
                    return element.id === post.id_user
                })

                if (attachment[0]) {
                    return {
                        ...post,
                        coments: coments,
                        attachment: {
                            id: attachment[0].id,
                            id_post: attachment[0].id_post,
                            url: `${IP_UPLOAD_PATH}${attachment[0].url}`
                        },
                        user: {
                            id: user[0].id,
                            name: user[0].name,
                            image_url: `${IP_UPLOAD_PATH}${user[0].image}`,
                            registration: user[0].registration,
                            city: user[0].city,
                            uf: user[0].uf,
                            latitude: user[0].latitude,
                            longitude: user[0].longitude,
                            birth: user[0].birth,
                            course: user[0].course,
                            whatsapp: user[0].whatsapp,
                            email: user[0].email,
                            password: user[0].password,
                            description: user[0].description
                        }
                    }
                } else {
                    return {
                        ...post,
                        coments: coments,
                        user: {
                            id: user[0].id,
                            name: user[0].name,
                            image_url: `${IP_UPLOAD_PATH}${user[0].image}`,
                            registration: user[0].registration,
                            city: user[0].city,
                            uf: user[0].uf,
                            latitude: user[0].latitude,
                            longitude: user[0].longitude,
                            birth: user[0].birth,
                            course: user[0].course,
                            whatsapp: user[0].whatsapp,
                            email: user[0].email,
                            password: user[0].password,
                            description: user[0].description
                        }
                    }
                }
            })

            return response
                .status(HTTP_SUCCESS)
                .json(
                    finalPosts
                )

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }



    async createPost(request: Request, response: Response) {
        try {

            const {
                id_group,
                id_user
            } = request.params

            const how = new Date()
            const day = how.getDate()
            const month = how.getMonth() + 1
            const year = how.getFullYear()
            const date = day + '/' + month + '/' + year

            const {
                contents,
            } = request.body

            const id_post = await knex('posts')
                .insert({
                    id_group,
                    id_user,
                    contents,
                    date,
                })

            if (request.file.filename) {
                const id_attachment = await knex('attachments')
                    .insert({
                        id_post,
                        url: request.file.filename,
                    })

                return response
                    .status(HTTP_CREATED)
                    .json({
                        id_group,
                        id_user,
                        contents,
                        date,
                        id_post,
                        url: request.file.filename,
                        id_attachment
                    })
            } else {
                return response
                    .status(HTTP_CREATED)
                    .json({
                        id_group,
                        id_user,
                        contents,
                        date,
                    })
            }

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }

    async createComent(request: Request, response: Response) {
        try {
            const {
                id_post,
                id_user
            } = request.params

            const {
                contents,
            } = request.body

            const how = new Date()
            const day = how.getDate()
            const month = how.getMonth() + 1
            const year = how.getFullYear()
            const date = day + '/' + month + '/' + year

            const id = await knex('coments')
                .insert({
                    id_post,
                    id_user,
                    contents,
                    date
                })

            return response
                .status(HTTP_CREATED)
                .json({
                    id,
                    id_post,
                    id_user,
                    contents,
                    date
                })

        } catch (error) {
            return response
                .status(HTTP_SERVER_ERROR)
                .json({ error })
        }
    }

    async addMemberToGroup(request: Request, response: Response) {
        try {

            const {
                id_group,
                id_user
            } = request.params

            const id_users_has_groups = await knex('users_has_groups')
                .insert({
                    id_group,
                    id_user
                })

            return response
                .status(HTTP_CREATED)
                .json({
                    id_users_has_groups,
                    id_group,
                    id_user
                })

        } catch (error) {
            return response
                .status(HTTP_SERVER_ERROR)
                .json({ error })
        }
    }
}

export default GroupPageController