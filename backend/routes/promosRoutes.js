// === promosRoutes.js (Rutas para Promos) ===
const express = require("express");
const router = express.Router();

// Middleware para verificar conexión a la base de datos
router.use((req, res, next) => {
  if (!req.db) {
    return res.status(500).send("La conexión a la base de datos no está disponible");
  }
  next();
});

// OBTENER TODAS LAS PROMOS
router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM promos", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// OBTENER UNA PROMO POR ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("SELECT * FROM promos WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Promo no encontrada");
    }
    res.status(200).json(results[0]);
  });
});

// CREAR UNA PROMO
router.post("/", (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).send("El nombre y el precio son obligatorios");
  }
  const db = req.db;
  db.query(
    "INSERT INTO promos (nombre, precio) VALUES (?, ?)",
    [nombre, precio],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("Promo agregada");
    }
  );
});

// ACTUALIZAR UNA PROMO
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).send("El nombre y el precio son obligatorios");
  }
  const db = req.db;
  db.query(
    "UPDATE promos SET nombre = ?, precio = ? WHERE id = ?",
    [nombre, precio, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Promo no encontrada");
      }
      res.status(200).send("Promo actualizada");
    }
  );
});

// ELIMINAR UNA PROMO
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM promos WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Promo no encontrada");
    }
    res.status(200).send("Promo eliminada");
  });
});

module.exports = router;
