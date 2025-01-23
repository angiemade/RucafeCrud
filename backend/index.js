const express = require ('express');
const mysql2 = require ('mysql2');
const cors = require ('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'rucafe',
});

db.connect((err)=>{
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else{
        console.log('Conectado a la base de datos');
    }
});

app.use((req,res,next)=>{
    req.db =db;
    next();
});

app.use('/categorias', require('./routes/categoriasRoutes'));
app.use('/subcategorias', require('./routes/subcategoriasRoutes'));
app.use('/productos', require('./routes/productosRoutes'));


app.listen(3001,()=>{
    console.log('Servidor escuchando en el puerto 3001');
}); 