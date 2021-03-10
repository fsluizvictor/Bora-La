import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import { TAttachments } from '../database/models/Attachment'
import { TComent } from '../database/models/Coment'
import { TPost } from '../database/models/Post'
import { HTTP_CREATED, HTTP_SERVER_ERROR, HTTP_SUCCESS } from '../utils/consts'

class GroupPageController {

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

            const finalPosts = posts.map((post: TPost) => {

                const coments = coment_all.filter((element: TComent) => {
                    return element.id_post === post.id
                })

                const attachment = attachment_all.filter((element: TAttachments) => {
                    return element.id_post === post.id
                })

                return {
                    ...post,
                    coments: coments,
                    attachment: attachment
                }
            })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    finalPosts
                })

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }



    async createPost(request: Request, response: Response) {
        try {

            const {
                id_group
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
                    contents,
                    date
                })

            return response
                .status(HTTP_CREATED)
                .json({
                    id,
                    id_post,
                    contents,
                    date
                })

        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json({ error })
        }
    }


}

export default GroupPageController