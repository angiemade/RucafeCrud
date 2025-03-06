// const db = mysql2.createConnection({
//   host: 'localhost', //yama
//   user: 'root',
//   password: 'mysql',
//   database: 'rucafe',
// });

//mysql://root:TJizpSLZMlUEgCYrAlBLYqlbzwlscXJT@yamanote.proxy.rlwy.net:28204/railway



// config.js (CommonJS)
require('dotenv').config(); // opcional si usas un .env local

module.exports = {
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'TJizpSLZMlUEgCYrAlBLYqlbzwlscXJT',
  DB_NAME: process.env.DB_NAME || 'rucafe',
  DB_PORT: process.env.DB_PORT || 28204, // O el puerto que uses en Railway
};



