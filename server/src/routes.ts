import express, { request, response } from 'express'

import GroupController from './controller/GroupController'
import UserController from './controller/UserController'
import GroupPageController from './controller/GroupPageController'
import AuthController from './controller/AuthController'

import multer from 'multer'
import multerConfig from './config_multer/multer'

const routes = express.Router()
const upload = multer(multerConfig)

const userController = new UserController()
const groupController = new GroupController()
const groupPageController = new GroupPageController()
const authController = new AuthController()

routes
    .get('/auth/:reg/:pass', authController.isAuthorized)

routes
    .get('/users', userController.index)
    .get('/users/groups/:id_user', userController.indexMyGroups)
    .get('/users/:id', userController.show)
    .post('/users', upload.single('image'), userController.create)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)

routes
    .get('/groups', groupController.index)
    .get('/groups/count/:group_id', groupController.countMembersPosts)
    .get('/groups/:id', groupController.show)
    .post('/groups', upload.single('image'), groupController.create)
    .put('/groups/:id', groupController.update)
    .delete('/groups/:id', groupController.delete)

routes
    .get('/groups_page/posts', groupPageController.indexPosts)
    .get('/groups_page/members/:id_group', groupPageController.indexMembersGroup)
    .get('/groups_page/posts/:id_group', groupPageController.indexFeedPosts)
    .get('/groups_page/attachments', groupPageController.indexAttachments)
    .get('/groups_page/coments', groupPageController.indexComents)
    .post('/groups_page/:id_group/:id_user', upload.single('image'), groupPageController.createPost)
    .post('/groups_page/coments/:id_post/:id_user', groupPageController.createComent)
    .post('/groups_page/add/:id_group/:id_user', groupPageController.addMemberToGroup)

export default routes