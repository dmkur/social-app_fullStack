const {Router} = require('express')
const {postController} = require("../controllers");

const postsRouter = Router()

postsRouter.get('/', postController.getPosts);
postsRouter.post('/', postController.addPost)
postsRouter.delete('/:id', postController.deletePost)

module.exports = postsRouter;
