const {Router} = require("express");

const NotesController = require("../controllers/noteController.js");

const notesRoutes = Router();

const notesController = new NotesController();
//to create a new instance that allows to add ths information to the userRoutes.post

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);

module.exports = notesRoutes;