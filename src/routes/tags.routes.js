const {Router} = require("express");

const TagsController = require("../controllers/tagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const tagsRoutes = Router();

const tagsController = new TagsController();
//to create a new instance that allows to add ths information to the userRoutes.post

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);


//não é passado user id no index pois estamos a usar uma query no insomnia

module.exports = tagsRoutes;