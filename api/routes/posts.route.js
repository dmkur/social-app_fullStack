const {Router} = require('express')
const {postController} = require("../controllers");

const postsRouter = Router()

postsRouter.get('/', postController.getPosts)

module.exports = postsRouter;
