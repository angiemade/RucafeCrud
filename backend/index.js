const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = require('./config'); 


const app = express();
app.use(express.json());
app.use(cors());


//mysql://root:TJizpSLZMlUEgCYrAlBLYqlbzwlscXJT@yamanote.proxy.rlwy.net:28204/railway
const db = mysql2.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT, // importante para Railway
});


db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Hacer que la conexión sea accesible en cada request
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/categorias', require('./routes/categoriasRoutes'));
app.use('/subcategorias', require('./routes/subcategoriasRoutes'));
app.use('/productos', require('./routes/productosRoutes'));
app.use('/promos', require('./routes/promosRoutes'));
app.use('/login', require('./routes/loginRoutes')); // Ruta para login

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ',PORT);
});
