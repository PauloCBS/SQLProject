const {Router} = require('express');
//this file is responsible to have all routes from our app.

const usersRoutes = require("./user.routes");
const notesRoutes = require("./notes.routes");


const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;
//to export the routes in this file.