// Productos.jsx
import React, { useState, useEffect } from "react";
//import Axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BarraProductos from "./BarraProductos";
import api from '../../../../api'


function Productos() {
  const [productos, setProductos] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    subcategoriaId: "",
  });
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  // Obtener subcategorías para el formulario (si es necesario)
  useEffect(() => {
    api.get("/subcategorias").then((response) => {
      setSubcategorias(response.data);
    });
  }, []);

  // Obtener productos filtrados según la categoría y término de búsqueda
  useEffect(() => {
    // Si se selecciona categoría o hay término de búsqueda, usa el endpoint de búsqueda.
    if (selectedCategory || searchTerm) {
      api.get("/productos/search", {
        params: {
          term: searchTerm,
          categoria: selectedCategory,
        },
      })
        .then((response) => {
          setProductos(response.data);
        })
        .catch((error) => console.error("Error fetching filtered products:", error));
    } else {
      // Si no hay filtro, obtener todos los productos.
      api.get("/productos")
        .then((response) => {
          setProductos(response.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [selectedCategory, searchTerm]);



// ----> Nuevo useEffect para escuchar el evento "productoCreado"
  useEffect(() => {
    const handleProductoCreado = () => {
      // Repetir la misma lógica de arriba para volver a obtener productos
      if (selectedCategory || searchTerm) {
        api.get("/productos/search", {
          params: { term: searchTerm, categoria: selectedCategory },
        })
          .then((response) => setProductos(response.data))
          .catch((error) => console.error("Error fetching filtered products:", error));
      } else {
        api.get("/productos")
          .then((response) => setProductos(response.data))
          .catch((error) => console.error("Error fetching products:", error));
      }
    };
  
    // Suscribirse al evento
    window.addEventListener("productoCreado", handleProductoCreado);
  
    // Limpieza al desmontar
    return () => {
      window.removeEventListener("productoCreado", handleProductoCreado);
    };
  }, [selectedCategory, searchTerm]);





  // Manejar cambios en el formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Abrir o cerrar el formulario de edición
  const editarProducto = (producto) => {
    if (productoSeleccionado?.id === producto.id) {
      setProductoSeleccionado(null);
    } else {
      setProductoSeleccionado(producto);
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        subcategoriaId: producto.subcategoria_id || "",
      });
    }
  };

  // Guardar cambios al producto (actualizar)
  const guardarProducto = () => {
    const payload = {
      ...formData,
      subcategoria_id: formData.subcategoriaId || null,
    };
    delete payload.subcategoriaId;

    api.put(`/productos/${productoSeleccionado.id}`, payload)
      .then(() => {
        setProductoSeleccionado(null);
        setFormData({ nombre: "", descripcion: "", precio: "", subcategoriaId: "" });
        // Re-fetch products with current filters
        if (selectedCategory || searchTerm) {
          api.get("/productos/search", {
            params: { term: searchTerm, categoria: selectedCategory },
          }).then((response) => setProductos(response.data));
        } else {
          api.get("/productos").then((response) => setProductos(response.data));
        }
      })
      .catch((error) => console.error("Error al guardar el producto:", error));
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    api.delete(`/productos/${id}`)
      .then(() => {
        setConfirmarEliminar(null);
        if (selectedCategory || searchTerm) {
          api.get("/productos/search", {
            params: { term: searchTerm, categoria: selectedCategory },
          }).then((response) => setProductos(response.data));
        } else {
          api.get("/productos").then((response) => setProductos(response.data));
        }
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

  return (
    <div className="container-fluid" style={{ padding: "20px", borderRadius: "20px" }}>
      <h4 style={{ fontWeight: "bold", color: "#000" }}>Gestión de Productos</h4>
      {/* Barra de búsqueda y filtro */}
      <BarraProductos
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="p-3 my-3"
          style={{
            backgroundColor: "#C06D26",
            borderRadius: "15px",
            color: "#fff",
            position: "relative",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{producto.nombre}</span>
            <div>
              <button
                className="btn btn-sm"
                style={{ color: "#000" }}
                onClick={() => editarProducto(producto)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-sm" style={{ color: "#000" }}>
                <i className="bi bi-eye"></i>
              </button>
              <button
                className="btn btn-sm"
                style={{ color: "#000" }}
                onClick={() => setConfirmarEliminar(producto.id)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>

          {productoSeleccionado?.id === producto.id && (
            <div
              className="mt-3 p-3"
              style={{ backgroundColor: "#fff", borderRadius: "15px", color: "#000" }}
            >
              <input
                type="text"
                className="form-control mb-2"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del Producto"
              />
              <textarea
                className="form-control mb-2"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del Producto"
              ></textarea>
              <input
                type="number"
                className="form-control mb-2"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Precio"
              />
              <select
                className="form-control mb-2"
                name="subcategoriaId"
                value={formData.subcategoriaId || ""}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una subcategoría</option>
                {subcategorias.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.nombre}
                  </option>
                ))}
              </select>

              <button
                className="btn btn-dark w-100"
                onClick={guardarProducto}
                style={{ borderRadius: "10px" }}
              >
                Guardar
              </button>
            </div>
          )}

          {confirmarEliminar === producto.id && (
            <div
              className="mt-3 p-3 text-center"
              style={{ backgroundColor: "#fff", borderRadius: "15px", color: "#000" }}
            >
              <p>¿Desea ELIMINAR este producto?</p>
              <button
                className="btn btn-dark me-2"
                onClick={() => eliminarProducto(producto.id)}
              >
                Sí
              </button>
              <button
                className="btn btn-light"
                onClick={() => setConfirmarEliminar(null)}
              >
                No
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Productos;