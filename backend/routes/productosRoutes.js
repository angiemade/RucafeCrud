// === productosRoutes.js (Rutas para Productos) ===
const express = require("express");
const router = express.Router();

// Middleware para verificar conexión a la base de datos
router.use((req, res, next) => {
  if (!req.db) {
    return res.status(500).send("La conexión a la base de datos no está disponible");
  }
  next();
});

// OBTENER TODOS LOS PRODUCTOS
router.get("/", (req, res) => {
  const db = req.db;
  db.query(
    `SELECT productos.*, subcategorias.nombre AS subcategoria_nombre 
     FROM productos 
     LEFT JOIN subcategorias ON productos.subcategoria_id = subcategorias.id`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// OBTENER PRODUCTOS POR SUBCATEGORÍA
// Ejemplo de llamada: GET /productos/filter?subcategoria=Desayunos%20y%20Meriendas
router.get("/filter", (req, res) => {
  const { subcategoria } = req.query;
  if (!subcategoria) {
    return res.status(400).send('El parámetro "subcategoria" es obligatorio');
  }
  const db = req.db;
  db.query(
    `SELECT productos.*, subcategorias.nombre AS subcategoria_nombre 
     FROM productos 
     LEFT JOIN subcategorias ON productos.subcategoria_id = subcategorias.id 
     WHERE subcategorias.nombre = ?`,
    [subcategoria],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(result);
    }
  );
});

// OBTENER TODAS LAS CATEGORÍAS
router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM categorias", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// OBTENER UN PRODUCTO POR ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query(
    `SELECT productos.*, subcategorias.nombre AS subcategoria_nombre 
     FROM productos 
     LEFT JOIN subcategorias ON productos.subcategoria_id = subcategorias.id
     WHERE productos.id = ?`,
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.length === 0) {
        res.status(404).send("Producto no encontrado");
      } else {
        res.status(200).json(result[0]);
      }
    }
  );
});


// CREAR UN PRODUCTO
router.post("/", (req, res) => {
  const { nombre, descripcion, precio, precio2, subcategoria_id } = req.body;
  if (!nombre || !precio) {
    return res.status(400).send("El nombre y el precio del producto son obligatorios");
  }
  const db = req.db;
  db.query(
    `INSERT INTO productos (nombre, descripcion, precio, precio2, subcategoria_id) 
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio, precio2 || null, subcategoria_id || null],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send("Producto agregado");
      }
    }
  );
});

// ACTUALIZAR UN PRODUCTO
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, precio2, subcategoria_id } = req.body;

  if (!nombre || !precio) {
    return res.status(400).send("El nombre y el precio del producto son obligatorios");
  }

  const db = req.db;
  db.query(
    `UPDATE productos 
     SET nombre = ?, descripcion = ?, precio = ?, precio2 = ?, subcategoria_id = ? 
     WHERE id = ?`,
    [nombre, descripcion, precio, precio2 || null, subcategoria_id || null, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.affectedRows === 0) {
        res.status(404).send("Producto no encontrado");
      } else {
        res.status(200).send("Producto actualizado");
      }
    }
  );
});


// ELIMINAR UN PRODUCTO
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send("Producto no encontrado");
    } else {
      res.status(200).send("Producto eliminado");
    }
  });
});


module.exports = router;
