const {hash, compare} = require("bcryptjs")
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
    
    const hashedPassword = await hash(password, 8); //8 is the number of times that the password will be hashed.

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
    //informações enviadas para a DB apartir da API
      return res.status(201).json();
  }

  async update(req, res){

    const {name, email, password, old_password} = req.body;
    const {id} = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user){  
      throw new AppError("Usuário não encontrado.");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
  
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){

      throw new AppError("Este e-mail já está em uso.");
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha.");

    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8); //8 is the number of times that the password will be hashed.
    }

    await database.run(`UPDATE users SET NAME = ?,EMAIL = ?, PASSWORD = ?, updated_at = DATETIME('now') WHERE ID = ?`, [user.name, user.email, user.password, id]); 

    return res.status(200).json();

  }

}

module.exports = UserController;

