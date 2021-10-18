const mysql = require('mysql2/promise')
const connection = async () => await mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'mysql'
}); 
const migrate = async () => {
    try {
        const conn = await connection() 
        await conn.execute('CREATE TABLE IF NOT EXISTS people ( ID int NOT NULL AUTO_INCREMENT, Name varchar(255) NOT NULL, PRIMARY KEY (ID) );')
    } catch (e) {
        throw e
    }
}
module.exports = {
    connection,
    migrate
}