// CrearProductos.jsx
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function CrearProductos() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [precio2, setPrecio2] = useState("");
  const [subcategoriaId, setSubcategoriaId] = useState("");
  const [subcategorias, setSubcategorias] = useState([]);

  // Cargar las subcategorías al montar el componente
  useEffect(() => {
    Axios.get("http://localhost:3001/subcategorias")
      .then((response) => {
        setSubcategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las subcategorías", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las subcategorías. Verifique el servidor.",
        });
      });
  }, []);

  // Función para limpiar el formulario
  const limpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setPrecio2("");
    setSubcategoriaId("");
  };

  // Función para enviar los datos y crear el producto
  const addProducto = () => {
    // Verificamos que los campos obligatorios estén completos
    if (!nombre || !precio || !subcategoriaId) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor complete el nombre, el precio y seleccione una subcategoría",
      });
      return;
    }

    // Preparamos el payload a enviar
    const payload = {
      nombre,
      descripcion,
      precio,
      precio2: precio2 ? precio2 : null,
      subcategoria_id: subcategoriaId,
    };

    Axios.post("http://localhost:3001/productos", payload)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Producto creado",
          text: "El producto fue registrado exitosamente",
          timer: 2000,
        });
        limpiarCampos();

        window.dispatchEvent(new Event("productoCreado"));
      })
      .catch((error) => {
        console.error("Error al crear producto", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo registrar el producto",
        });
      });
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Crear Producto</h3>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ingrese el precio"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio 2 (opcional)</label>
          <input
            type="number"
            className="form-control"
            value={precio2}
            onChange={(e) => setPrecio2(e.target.value)}
            placeholder="Ingrese precio para pizza de 4porciones"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción (opcional)</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese una descripción"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategoría</label>
          <select
            className="form-select"
            value={subcategoriaId}
            onChange={(e) => setSubcategoriaId(e.target.value)}
          >
            <option value="">Seleccione una subcategoría</option>
            {subcategorias.map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={addProducto}>
            Crear Producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrearProductos;
