const bcrypt = require('bcrypt');
const mysql2 = require('mysql2');

const saltRounds = 10;
const plainPassword = 'RUCAFE00'; // La contraseña original

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al encriptar la contraseña:', err);
    return;
  }
  console.log('Contraseña hasheada:', hash);

  // Conecta a la base de datos para actualizar el usuario
  const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'rucafe',
  });

  db.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      return;
    }
    db.query(
      'UPDATE usuarios SET password = ? WHERE username = ?',
      [hash, 'admin'],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar la contraseña:', error);
        } else {
          console.log('Contraseña actualizada correctamente');
        }
        db.end();
      }
    );
  });
});
