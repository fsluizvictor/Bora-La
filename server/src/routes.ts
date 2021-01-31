import express, { request, response } from 'express'

import GroupController from './controller/GroupController'
import UserController from './controller/UserController'

import multer from 'multer'
import multerConfig from './config_multer/multer'

const routes = express.Router()
const upload = multer(multerConfig)

const userController = new UserController()
const groupController = new GroupController()

routes
    .get('/users', userController.index)
    .get('/users/:id', userController.show)
    .post('/users', upload.single('image'), userController.create)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)

routes
    .get('/groups', groupController.index)
    .get('/groups/:id', groupController.show)
    .post('/groups', upload.single('image'), groupController.create)
    .put('/groups/:id', groupController.update)
    .delete('/gorups/:id', groupController.delete)

export default routes 