const mysql = require("mysql2");

const pool = mysql.createPool({

    host: 'db4free.net',
    user: 'mdflamorangels',
    password: 'Citron1-',
    database: 'inforomu',
 
  });

module.exports = pool.promise();