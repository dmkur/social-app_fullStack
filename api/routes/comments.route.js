const {Router} = require('express')
const {commentController} = require("../controllers");

const commentsRouter = Router()

commentsRouter.get('/', commentController.getComments);

commentsRouter.post('/', commentController.addComment);

module.exports = commentsRouter;
