const mysql = require('mysql');
const config = require('./db_info');

module.exports = function(){
    return {
    init : () => {
        return mysql.createConnection({
            host : config.host,
            port : config.port,
            user : config.user,
            password : config.password,
            database : config.database
        })
    }
    }

};