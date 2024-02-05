const {Router} = require("express");

const UserController = require("../controllers/UserController");

const userRoutes = Router();


function myMyddleware(req, res, next){
//using middleware we can access the requisiton, the answer and the next middleware

 console.log("você passou pelo middleware")

 if(!req.body.isAdmin){
    return res.status(401).json({message: "Você não é admin"});
 }
 //foi criada

 next()
 //chama a proxima função que esta na fila e dessa forma ele segue para o usar controller.create.

}




const userController = new UserController();
//to create a new instance that allows to add ths information to the userRoutes.post

userRoutes.post("/",myMyddleware, userController.create);

module.exports = userRoutes;