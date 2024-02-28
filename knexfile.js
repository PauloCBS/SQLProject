const path = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool:{
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)  //para habilitar as chaves estrangeiras no sqlite3
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },

    useNullAsDefault: true,
    //propriedade padrão para uso do sqlite
  }


};

