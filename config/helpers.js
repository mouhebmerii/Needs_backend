const MySqli = require('mysqli');
let conn = new MySqli({
    host:process.env.DB_HOST ,
    post: process.env.DB_PORT,
    user: process.env.DB_USER,
    passwd: process.env.DB_PASS,
    db: process.env.MYSQL_DB
});
let db = conn.emit(false, '');

module.exports = {
    database: db
};
