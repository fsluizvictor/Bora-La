import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'
import { HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_CREATED, IP_UPLOAD_PATH } from '../utils/consts'
import { TGroup, } from '../database/models/Group'

class UserPageController {

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

    async indexOthersGroups(request: Request, response: Response) {
        try {


            return response
                .status(HTTP_SUCCESS)
                .json({
                })

        } catch (error) {

            return response
                .status(HTTP_SERVER_ERROR)
                .json(error)

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


}

export default UserPageController