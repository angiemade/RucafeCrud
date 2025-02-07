import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function HeaderSearch() {
  const [categorias, setCategorias] = useState([]);
  const [showCategorias, setShowCategorias] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener las categorías del backend
  useEffect(() => {
    Axios.get("http://localhost:3001/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSearch = () => {
    // Aquí implementa la lógica de búsqueda. Por ejemplo, podrías redirigir a una página de resultados.
    console.log("Buscar:", searchTerm, "Categoría:", selectedCategoria);
    // Ejemplo: navigate(`/search?term=${searchTerm}&categoria=${selectedCategoria}`);
    alert(`Buscar: ${searchTerm} en categoría: ${selectedCategoria}`);
  };

  return (
    <header className="d-flex flex-column flex-md-row align-items-center justify-content-center p-3 bg-light">
      {/* Contenedor central para dropdown y barra de búsqueda */}
      <div className="d-flex flex-column flex-md-row align-items-center flex-grow-1 mx-3">
        {/* Dropdown para seleccionar categoría */}
        <div className="dropdown me-2">
          <button
            className="btn btn-pink dropdown-toggle"
            onClick={() => setShowCategorias(!showCategorias)}
          >
            {selectedCategoria
              ? categorias.find((c) => c.id === selectedCategoria)?.nombre ||
                "Ver categorías"
              : "Ver categorías"}
          </button>
          {showCategorias && (
            <div className="dropdown-menu show">
              <button
                className="dropdown-item"
                onClick={() => {
                  setSelectedCategoria("");
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
                    setSelectedCategoria(categoria.id);
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
          <button className="btn input-group-text" onClick={handleSearch}>
            <i className="bi bi-search-heart"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
