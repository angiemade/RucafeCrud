const express = require('express');
const bcrypt = require('bcrypt'); // Importamos bcrypt
const router = express.Router();

// Ruta para iniciar sesión
router.post('/', (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ message: 'La contraseña es requerida' });
    }

    // Se eliminan espacios en blanco al inicio y final
    const enteredPassword = password.trim();
    const db = req.db;

    db.query('SELECT * FROM usuarios WHERE username = ?', ['admin'], (err, results) => {
      if (err) {
        console.error('Error al consultar la base de datos:', err);
        return res.status(500).send('Error interno del servidor');
      }

      console.log('Contraseña ingresada:', enteredPassword);

      if (results.length > 0) {
        const storedPasswordHash = results[0].password; // Hash almacenado en la BD
        console.log('Hash en BD:', storedPasswordHash);

        // Compara la contraseña ingresada con el hash
        bcrypt.compare(enteredPassword, storedPasswordHash, (err, isMatch) => {
          if (err) {
            console.error('Error al comparar contraseñas:', err);
            return res.status(500).send('Error interno del servidor');
          }
          if (isMatch) {
            return res.status(200).send({ message: 'Autenticado correctamente' });
          } else {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
          }
        });
      } else {
        return res.status(401).send({ message: 'Contraseña incorrecta' });
      }
    });
  } catch (error) {
    console.error('Error en la ruta /login:', error);
    return res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
