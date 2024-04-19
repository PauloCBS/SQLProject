const {verify} = require("jsonwebtoken");
const AppError = require ("../utils/app.error");
const authConfig = require("../configs/auth");


function ensureAuthenticated(req, res, next){

    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT token isn't valid", 401)
    }

    const[,token] = authHeader.split(" ");
    //pegamos o array e selecionamos apenas o token.

    try{
       const{sub: user_id} = verify(token, authConfig.jwt.secret);

       req.user = {
            id: Number(user_id),       
    };

    return next()
    
    } catch{
        throw new AppError("JWT token doesn't exist", 401)
    }
}

module.exports = ensureAuthenticated;