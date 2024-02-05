const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")
//it allows the DB to be accessed in any SO. 

/* an async function was created because to avoid errors during the creation of or DB.
 this function is responsible to connect the application with our application.*/
async function sqliteConnection(){ 
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: await sqlite3.Database
    });

    return database
    
 }

 module.exports = sqliteConnection;