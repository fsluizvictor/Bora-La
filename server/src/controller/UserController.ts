import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'
import { HTTP_AUTHORIZATION, HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_VALIDATION } from '../utils/consts'

class UserController {

    async index(request: Request, response: Response) {
        try {

            const results = await knex('users')
                .select('*')

            return response
                .status(HTTP_SUCCESS)
                .json(results)

        } catch (error) {

            return response.status(HTTP_SERVER_ERROR).json(error)

        }
    }

    async show(request: Request, response: Response) {
        try {

            const { id } = request.params
            const user = await knex('users')
                .where('id', id)
                .first()

            return response
                .status(HTTP_SUCCESS)
                .json({
                    ...user
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
                registration,
                city,
                uf,
                latitude,
                longitude,
                birth,
                course,
                email,
                description,
            } = request.body

            const password = bcrypt.hashSync(request.body.password, 8)
            const image = request.body.filename

            const id = await knex('users')
                .insert({
                    name,
                    registration,
                    city,
                    uf,
                    latitude,
                    longitude,
                    birth,
                    course,
                    email,
                    password,
                    description,
                })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    id,
                    name,
                    registration,
                    city,
                    uf,
                    latitude,
                    longitude,
                    birth,
                    course,
                    email,
                    description,
                    password
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
                registration,
                city,
                uf,
                latitude,
                longitude,
                birth,
                course,
                email,
                description
            } = request.body

            await knex('users')
                .update({
                    name,
                    registration,
                    city,
                    uf,
                    latitude,
                    longitude,
                    birth,
                    course,
                    email,
                    description
                })
                .where({ id })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    id,
                    name,
                    registration,
                    city,
                    uf,
                    latitude,
                    longitude,
                    birth,
                    course,
                    email,
                    description
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

            await knex('users')
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

export default UserController