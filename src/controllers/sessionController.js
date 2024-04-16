const knex = require("../database/knex");
const AppError = require("../utils/app.error")

class SessionsController{
    async create(req, res){

        const {email, password} = req.body;

        const user = await knex("users").where({email}).first();


        if(!user){
            throw new AppError("e-mail or password is incorrect")
        }

        return res.json(user)

    }
}

module.exports = SessionsController;