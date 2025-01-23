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



// Ruta para obtener el menú
router.get("/menu", (req, res) => {
  const db = req.db;
  db.query(
    `SELECT 
       c.nombre AS categoria_nombre,
       s.nombre AS subcategoria_nombre,
       p.nombre AS producto_nombre,
       p.descripcion,
       p.precio,
       p.precio2
     FROM productos p
     LEFT JOIN subcategorias s ON p.subcategoria_id = s.id
     LEFT JOIN categorias c ON s.categoria_id = c.id`,
    (err, result) => {
      if (err) {
        return res.status(500).send("Error al obtener el menú");
      }

      const menu = result.reduce((acc, item) => {
        const {
          categoria_nombre,
          subcategoria_nombre,
          producto_nombre,
          descripcion,
          precio,
          precio2,
        } = item;

        // Crear la categoría si no existe
        if (!acc[categoria_nombre]) {
          acc[categoria_nombre] = {};
        }

        // Crear la subcategoría si no existe
        if (!acc[categoria_nombre][subcategoria_nombre]) {
          acc[categoria_nombre][subcategoria_nombre] = [];
        }

        // Agregar el producto a la subcategoría
        acc[categoria_nombre][subcategoria_nombre].push({
          nombre: producto_nombre,
          descripcion,
          precio,
          precio2,
        });

        return acc;
      }, {});

      res.status(200).json(menu);
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
