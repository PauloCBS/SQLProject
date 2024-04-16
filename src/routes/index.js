const {Router} = require('express');
//this file is responsible to have all routes from our app.

const usersRoutes = require("./user.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");


const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);



module.exports = routes;
//to export the routes in this file.