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

            const user = await knex('users')
                .where('registration', registration)
                .first()

            if (!user)
                return response.sendStatus(HTTP_NO_AUTHENTICATED)

            //const crypto_password = bcrypt.hashSync(password, 8)

            const isValidPassword = password === Number(user.password)

            if (!isValidPassword)
                return response.sendStatus(HTTP_NO_AUTHENTICATED)

            return response
                .status(HTTP_ACCEPTED)
                .json(
                    user
                )

        } catch (error) {

            return response.status(HTTP_SERVER_ERROR).json(error)

        }
    }
}


export default AuthController