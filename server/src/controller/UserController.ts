import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'
import { HTTP_AUTHORIZATION, HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_VALIDATION } from '../utils/consts'

class UserController {

    async index(request: Request, response: Response) {
        try {

            const results = await knex('Users')

            return response.json(results)

        } catch (error) {

            return response.status(HTTP_SERVER_ERROR).json(error)

        }
    }

    async show(request: Request, response: Response) {
        try {

            const { id } = request.params
            const user = await knex('Users')
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
                active
            } = request.body

            const password = bcrypt.hashSync(request.body.password, 8)
            const image = request.body.filename

            const user = {
                name,
                image,
                registration,
                city,
                uf,
                latitude,
                longitude,
                birth,
                course,
                email,
                description,
                password,
            }

            const trx = await knex.transaction()

            const id = await trx('Users').insert(user)

            await trx.commit()

            return response
                .status(HTTP_SUCCESS)
                .json({
                    id,
                    ...user
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

            await knex('Users')
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

            await knex('Users')
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
















