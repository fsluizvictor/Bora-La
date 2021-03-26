import { Request, Response, json, request } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'
import { HTTP_SUCCESS, HTTP_SERVER_ERROR, HTTP_CREATED, IP_UPLOAD_PATH, HTTP_NO_AUTHENTICATED, HTTP_ACCEPTED } from '../utils/consts'
import { TUser } from '../database/models/User'

class AuthController {

    async isAuthorized(request: Request, response: Response) {
        try {

            const {
                registration,
                password
            } = request.body

            console.log(1)

            const user: TUser = await knex('users')
                .where('registration', registration)
                .first()

            if (!user)
                return response.sendStatus(HTTP_NO_AUTHENTICATED)

            const isValidPassword = bcrypt.compare(password, user.password)

            if (isValidPassword)
                return response
                    .status(HTTP_ACCEPTED)
                    .json({
                        ...user
                    })
            else
                return response
                    .status(HTTP_NO_AUTHENTICATED)
                    .json({
                    })

        } catch (error) {

            return response.status(HTTP_SERVER_ERROR).json(error)

        }
    }
}

export default AuthController