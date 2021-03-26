import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'
import { HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_CREATED, IP_UPLOAD_PATH, HTTP_NO_AUTHENTICATED, HTTP_ACCEPTED } from '../utils/consts'
import { TGroup } from '../database/models/Group'
import { TUser } from '../database/models/User'

class UserController {

    async index(request: Request, response: Response) {
        try {

            const results = await knex('users')
                .select('*')

            const serializedUsers = results.map(user => {
                return {
                    ...user,
                    image_url: `${IP_UPLOAD_PATH}${user.image}`
                }
            })

            return response
                .status(HTTP_SUCCESS)
                .json({
                    ...serializedUsers
                })

        } catch (error) {

            return response.status(HTTP_SERVER_ERROR).json(error)

        }
    }

    async indexMyGroups(request: Request, response: Response) {
        try {

            const {
                id_user
            } = request.params

            const myGroups = await knex
                .select('*')
                .from('groups')
                .join('users_has_groups', 'users_has_groups.id_group', 'groups.id')
                .where('users_has_groups.id_user', '=', id_user)

            const groups = myGroups.map(group => {
                return {
                    ...group,
                    image_url: `${IP_UPLOAD_PATH}${group.image}`
                }
            })

            return response
                .status(HTTP_SUCCESS)
                .json(
                    groups
                )

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

            const serializedUser = {
                ...user,
                image_url: `${IP_UPLOAD_PATH}${user.image}`
            }

            return response
                .status(HTTP_SUCCESS)
                .json({
                    ...serializedUser
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
                whatsapp
            } = request.body

            const password = bcrypt.hashSync(request.body.password, 8)

            const id = await knex('users')
                .insert({
                    name,
                    registration,
                    image: request.file.filename,
                    city,
                    uf,
                    latitude,
                    longitude,
                    birth,
                    course,
                    email,
                    password,
                    description,
                    whatsapp
                })

            return response
                .status(HTTP_CREATED)
                .json({
                    id,
                    name,
                    image: request.file.filename,
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
                    whatsapp
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