import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Promos() {
  const [promos, setPromos] = useState([]);
  const [promoSeleccionada, setPromoSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: ""
  });
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  // Obtener las promociones
  useEffect(() => {
    Axios.get("http://localhost:3001/promos")
      .then((response) => {
        setPromos(response.data);
      })
      .catch((error) => console.error("Error fetching promos:", error));
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Abrir o cerrar el formulario de edición para una promo
  const editarPromo = (promo) => {
    if (promoSeleccionada?.id === promo.id) {
      setPromoSeleccionada(null); // Cerrar formulario
    } else {
      setPromoSeleccionada(promo); // Abrir formulario
      setFormData({
        nombre: promo.nombre,
        precio: promo.precio
      });
    }
  };

  // Guardar cambios a la promo (actualizar)
  const guardarPromo = () => {
    const payload = { ...formData };
    Axios.put(`http://localhost:3001/promos/${promoSeleccionada.id}`, payload)
      .then(() => {
        setPromoSeleccionada(null);
        setFormData({ nombre: "", precio: "" });
        // Recargar lista de promos sin recargar la página
        Axios.get("http://localhost:3001/promos")
          .then((response) => {
            setPromos(response.data);
          })
          .catch((error) => console.error("Error fetching promos:", error));
      })
      .catch((error) => console.error("Error al guardar la promo:", error));
  };

  // Eliminar promo
  const eliminarPromo = (id) => {
    Axios.delete(`http://localhost:3001/promos/${id}`)
      .then(() => {
        setConfirmarEliminar(null);
        Axios.get("http://localhost:3001/promos")
          .then((response) => {
            setPromos(response.data);
          })
          .catch((error) => console.error("Error fetching promos:", error));
      })
      .catch((error) => console.error("Error al eliminar la promo:", error));
  };

  return (
    <div className="container-fluid" style={{ padding: "20px", borderRadius: "20px" }}>
      <h4 style={{ fontWeight: "bold", color: "#000" }}>Gestión de Promociones</h4>
      {promos.map((promo) => (
        <div
          key={promo.id}
          className="p-3 my-3"
          style={{
            backgroundColor: "#C06D26",
            borderRadius: "15px",
            color: "#fff",
            position: "relative"
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{promo.nombre}</span>
            <div>
              <button
                className="btn btn-sm"
                style={{ color: "#000" }}
                onClick={() => editarPromo(promo)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-sm" style={{ color: "#000" }}>
                <i className="bi bi-eye"></i>
              </button>
              <button
                className="btn btn-sm"
                style={{ color: "#000" }}
                onClick={() => setConfirmarEliminar(promo.id)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>

          {promoSeleccionada?.id === promo.id && (
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
                placeholder="Nombre de la Promo"
              />
              <input
                type="number"
                className="form-control mb-2"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Precio"
              />
              <button
                className="btn btn-dark w-100"
                onClick={guardarPromo}
                style={{ borderRadius: "10px" }}
              >
                Guardar
              </button>
            </div>
          )}

          {confirmarEliminar === promo.id && (
            <div
              className="mt-3 p-3 text-center"
              style={{ backgroundColor: "#fff", borderRadius: "15px", color: "#000" }}
            >
              <p>¿Desea ELIMINAR esta promoción?</p>
              <button
                className="btn btn-dark me-2"
                onClick={() => eliminarPromo(promo.id)}
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

export default Promos;
