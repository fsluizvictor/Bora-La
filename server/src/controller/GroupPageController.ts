import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
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


    async createPost(request: Request, response: Response) {
        //try {

        const {
            id_group
        } = request.params

        const {
            contents,
            date,
            like,
            ban,
        } = request.body

        const id_post = await knex('posts')
            .insert({
                id_group,
                contents,
                date,
                like,
                ban
            })

        const url = request.file.filename

        if (url) {
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
                    like,
                    ban,
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
                    like,
                    ban,
                })
        }

        // } catch (error) {
        //     return response.status(HTTP_SERVER_ERROR).json({ error })
        // }
    }


}

export default GroupPageController