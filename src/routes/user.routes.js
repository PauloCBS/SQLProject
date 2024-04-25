const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../controllers/UserController");
const userRoutes = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const UserAvatarController = require("../controllers/avatarController");
const upload = multer(uploadConfig.MULTER);


function myMyddleware(req, res, next){
//using middleware we can access the requisiton, the answer and the next middleware

 console.log("você passou pelo middleware")


 next()
 //chama a proxima função que esta na fila e dessa forma ele segue para o usar controller.create.

}

const userController = new UserController();
//to create a new instance that allows to add ths information to the userRoutes.post
const userAvatarController = new UserAvatarController();

userRoutes.post("/",myMyddleware, userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update )

module.exports = userRoutes;