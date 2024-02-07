const AppError = require('../utils/app.error');
const sqliteConnection = require('../database/sqlite');


class UserController{
//we will use a class because its possible to add many functions inside. A controller can hav only 5 functions

/*
index- GET para listar varios registros
show - GET para exibir um registro especifico
create - POST para criar um registro
update - PUT para atualizar um registro
delete - DELETE para remover um registro
*/

async create(req, res){
    
    const {name, email, password} = req.body;
    
    //this way we do the request from the json file inside the body of our insomnia body. 
    //res.send(`Usuário: ${name}. E-mail: ${email}. Password: ${password}`);
    //note that the main difference between route params and query params is that no params is necessary. 
    //we can also send the information in different formats eg. json.
    
   /* if(!name) {
        throw new AppError("Nome é obrigatório!");
      };
        
        res.status(201).json( {name, email, password} );
    };*/
    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso.");

      } 

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    //informações enviadas para a DB apartir da API
      return res.status(201).json();
  }
}

module.exports = UserController;

