const {Router} = require("express");

const TagsController = require("../controllers/tagsController");

const tagsRoutes = Router();

const tagsController = new TagsController();
//to create a new instance that allows to add ths information to the userRoutes.post

tagsRoutes.get("/:user_id", tagsController.index);


//não é passado user id no index pois estamos a usar uma query no insomnia

module.exports = tagsRoutes;