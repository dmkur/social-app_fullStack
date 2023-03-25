const {Router} = require('express')
const {authController} = require("../controllers");

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)

module.exports = authRouter;
