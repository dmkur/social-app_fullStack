const {Router} = require('express')
const {userController} = require("../controllers");

const usersRouter = Router()

usersRouter.get('/find/:userId', userController.getUser)

module.exports = usersRouter;
