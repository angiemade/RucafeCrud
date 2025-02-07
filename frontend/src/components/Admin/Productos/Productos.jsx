import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Barraproductos from "./BarraProductos";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    subcategoriaId: "",
  });
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  // Obtener productos y subcategorías
  useEffect(() => {
    Axios.get("http://localhost:3001/productos").then((response) => {
      setProductos(response.data);
    });
    Axios.get("http://localhost:3001/subcategorias").then((response) => {
      setSubcategorias(response.data);
    });
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Abrir o cerrar el formulario de edición
  const editarProducto = (producto) => {
    if (productoSeleccionado?.id === producto.id) {
      setProductoSeleccionado(null); // Cerrar formulario
    } else {
      setProductoSeleccionado(producto); // Abrir formulario
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        subcategoriaId: producto.subcategoria_id || "", // Mantener subcategoría actual
      });
    }
  };

  // Guardar cambios al producto
const guardarProducto = () => {
  const payload = {
    ...formData,
    subcategoria_id: formData.subcategoriaId || null, // Ajuste para enviar al backend el nombre correcto
  };
  delete payload.subcategoriaId; // Eliminamos el campo viejo para evitar errores

  Axios.put(`http://localhost:3001/productos/${productoSeleccionado.id}`, payload)
    .then(() => {
      setProductoSeleccionado(null);
      setFormData({ nombre: "", descripcion: "", precio: "", subcategoriaId: "" });
      Axios.get("http://localhost:3001/productos").then((response) => {
        setProductos(response.data); // Recargar lista sin recargar toda la página
      });
    })
    .catch((error) => console.error("Error al guardar el producto:", error));
};


  // Eliminar producto
  const eliminarProducto = (id) => {
    Axios.delete(`http://localhost:3001/productos/${id}`)
      .then(() => {
        setConfirmarEliminar(null);
        Axios.get("http://localhost:3001/productos").then((response) => {
          setProductos(response.data); // Recargar lista tras eliminar
        });
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

  return (
    <div className="container-fluid" style={{ padding: "20px", borderRadius: "20px" }}>
      <h4 style={{ fontWeight: "bold", color: "#000" }}>Gestión de Productos</h4>
      <div>  <Barraproductos/>  </div>
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
                value={formData.subcategoriaId || ""} // Evitar undefined
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
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                color: "#000",
              }}
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
