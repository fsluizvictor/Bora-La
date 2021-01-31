import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import { HTTP_AUTHORIZATION, HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_VALIDATION } from '../utils/consts'

class GroupController {
    async index(request: Request, response: Response) {
        try {

            const results = await knex('groups')
                .select('*')

            return response.json(results)

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

            return response
                .status(HTTP_SUCCESS)
                .json({
                    ...group
                })

        } catch (error) {

            return response
                .status(HTTP_SERVER_ERROR)
                .json(error)

        }
    }

    async create(request: Request, response: Response) {
        try {

            const {
                name,
                date,
                description,
                occupation_area,
                rules,
                image
            } = request.body


            const id = await knex('groups')
                .insert({
                    name,
                    date,
                    description,
                    occupation_area,
                    rules,
                    image
                })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    id,
                    name,
                    date,
                    description,
                    occupation_area,
                    rules,
                    image
                })

        } catch (error) {

            return response
                .status(HTTP_SERVER_ERROR)
                .json(error)

        }
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