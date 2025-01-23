// === subcategoriasRoutes.js (Rutas para Subcategorías) ===
const express = require("express");
const router = express.Router();

// Conexión a la base de datos desde req
router.use((req, res, next) => {
  if (!req.db) {
    return res.status(500).send("La conexión a la base de datos no está disponible");
  }
  next();
});

// OBTENER TODAS LAS SUBCATEGORÍAS
router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM subcategorias", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// OBTENER SUBCATEGORÍAS POR ID DE CATEGORÍA
router.get("/categoria/:categoria_id", (req, res) => {
  const { categoria_id } = req.params;
  const db = req.db;
  db.query("SELECT * FROM subcategorias WHERE categoria_id = ?", [categoria_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// CREAR UNA SUBCATEGORÍA
router.post("/", (req, res) => {
  const { nombre, categoria_id } = req.body;
  if (!nombre || !categoria_id) {
    return res.status(400).send("El nombre y la categoría son obligatorios");
  }
  const db = req.db;
  db.query(
    "INSERT INTO subcategorias (nombre, categoria_id) VALUES (?, ?)",
    [nombre, categoria_id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send("Subcategoría agregada");
      }
    }
  );
});

// ACTUALIZAR UNA SUBCATEGORÍA
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, categoria_id } = req.body;
  if (!nombre || !categoria_id) {
    return res.status(400).send("El nombre y la categoría son obligatorios");
  }
  const db = req.db;
  db.query(
    "UPDATE subcategorias SET nombre = ?, categoria_id = ? WHERE id = ?",
    [nombre, categoria_id, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Subcategoría actualizada");
      }
    }
  );
});

// ELIMINAR UNA SUBCATEGORÍA
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM subcategorias WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Subcategoría eliminada");
    }
  });
});

module.exports = router;
