// Barraproductos.jsx
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function BarraProductos({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }) {
  const [categorias, setCategorias] = useState([]);
  const [showCategorias, setShowCategorias] = useState(false);

  // Obtener las categorías del backend
  useEffect(() => {
    Axios.get("http://localhost:3001/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center p-3 bg-light">
      {/* Dropdown para seleccionar categoría */}
      <div className="dropdown me-2">
        <button
          className="btn btn-pink dropdown-toggle"
          onClick={() => setShowCategorias(!showCategorias)}
        >
          {selectedCategory
            ? categorias.find((c) => c.id === selectedCategory)?.nombre || "Ver categorías"
            : "Ver categorías"}
        </button>
        {showCategorias && (
          <div className="dropdown-menu show">
            <button
              className="dropdown-item"
              onClick={() => {
                setSelectedCategory("");
                setShowCategorias(false);
              }}
            >
              Todas las categorías
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className="dropdown-item"
                onClick={() => {
                  setSelectedCategory(categoria.id);
                  setShowCategorias(false);
                }}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Input de búsqueda */}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar"
          aria-label="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn input-group-text">
          <i className="bi bi-search-heart"></i>
        </button>
      </div>
    </div>
  );
}

export default BarraProductos;
