const {Router} = require('express')
const {userController} = require("../controllers");

const usersRouter = Router()

usersRouter.get('/test', userController.getUser)

module.exports = usersRouter;
