const {Router} = require('express')
const {authController} = require("../controllers");

const authRouter = Router()

authRouter.get('/register',authController.register )
authRouter.get('/login',authController.login )
authRouter.get('/logout',authController.logout )

module.exports = authRouter;
