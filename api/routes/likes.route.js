const {Router} = require('express')
const {likeController} = require("../controllers");

const likesRouter = Router()

likesRouter.get('/', likeController.getLikes)
likesRouter.post('/', likeController.addLike)
likesRouter.delete('/', likeController.deleteLike)

module.exports = likesRouter;

