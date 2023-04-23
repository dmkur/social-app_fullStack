const {Router} = require('express')
const {relationshipsController} = require("../controllers");

const relationshipsRouter = Router()


relationshipsRouter.get('/', relationshipsController.getRelationships)
relationshipsRouter.post('/', relationshipsController.addRelationships)
relationshipsRouter.delete('/', relationshipsController.deleteRelationships)


module.exports = relationshipsRouter;
