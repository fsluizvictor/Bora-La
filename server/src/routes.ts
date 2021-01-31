import express, { request, response } from 'express'
import GroupController from './controller/GroupController'
import UserController from './controller/UserController'

const routes = express.Router()

const userController = new UserController()
const groupController = new GroupController()

routes
    .get('/users', userController.index)
    .get('/users/:id', userController.show)
    .post('/users', userController.create)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)

routes
    .get('/groups', groupController.index)
    .get('/groups/:id', groupController.show)
    .post('/groups', groupController.create)
    .put('/groups/:id', groupController.update)
    .delete('/gorups/:id', groupController.delete)

export default routes 