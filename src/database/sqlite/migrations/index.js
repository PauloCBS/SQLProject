const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');


async function migrationRun(){
    const schemas=[
    createUsers
    //podemos criar um para cada migrations que tivermos.
    ].join('')

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));


}

module.exports = migrationRun;