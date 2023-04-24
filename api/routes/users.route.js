const {Router} = require('express')
const {userController} = require("../controllers");

const usersRouter = Router()

usersRouter.get('/find/:userId', userController.getUser)
usersRouter.put('/', userController.updateUser)

module.exports = usersRouter;
