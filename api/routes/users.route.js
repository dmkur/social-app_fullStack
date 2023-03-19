const {Router} = require('express')
const { authController} = require("../controllers");

const usersRouter = Router()

usersRouter.get('/test', authController.login)

module.exports = usersRouter;
