import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import { HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_CREATED, IP_UPLOAD_PATH } from '../utils/consts'

class GroupController {

    async index(request: Request, response: Response) {
        try {
            const results = await knex('groups')
                .select('*')

            const serializedGroups = results.map(group => {
                return {
                    ...group,
                    image_url: `IP_UPLOAD_PATH${group.image}`
                }
            })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    ...serializedGroups
                })
        } catch (error) {
            return response.status(HTTP_SERVER_ERROR).json(error)
        }
    }

    async show(request: Request, response: Response) {
        try {

            const { id } = request.params
            const group = await knex('groups')
                .where('id', id)
                .first()

            const serializedGroup = {
                ...group,
                image_url: `IP_UPLOAD_PATH${group.image}`
            }

            return response
                .status(HTTP_SUCCESS)
                .json({
                    ...serializedGroup
                })

        } catch (error) {

            return response
                .status(HTTP_SERVER_ERROR)
                .json(error)

        }
    }

    async create(request: Request, response: Response) {
        //try {

        const {
            name,
            date,
            description,
            occupation_area,
            rules,
        } = request.body


        const id = await knex('groups')
            .insert({
                name,
                image: request.file.filename,
                date,
                description,
                occupation_area,
                rules,
            })

        return response
            .status(HTTP_CREATED)
            .json({
                id,
                image: request.file.filename,
                name,
                date,
                description,
                occupation_area,
                rules,
            })

        // } catch (error) {

        //     return response
        //         .status(HTTP_SERVER_ERROR)
        //         .json(error)

        // }
    }

    async update(request: Request, response: Response) {
        try {

            const { id } = request.params

            const {
                name,
                date,
                description,
                occupation_area,
                rules
            } = request.body

            await knex('groups')
                .update({
                    name,
                    date,
                    description,
                    occupation_area,
                    rules
                })
                .where({ id })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    id,
                    name,
                    date,
                    description,
                    occupation_area,
                    rules
                })

        } catch (error) {

            return response
                .status(HTTP_SERVER_ERROR)
                .json(error)

        }
    }

    async delete(request: Request, response: Response) {
        try {

            const { id } = request.params

            await knex('groups')
                .where({ id })
                .del()

            return response
                .status(HTTP_SUCCESS)
                .json({
                    id
                })

        } catch (error) {

            return response
                .status(HTTP_SERVER_ERROR)
                .json(error)

        }
    }
}

export default GroupController