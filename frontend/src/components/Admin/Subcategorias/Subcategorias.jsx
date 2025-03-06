import { useState, useEffect } from 'react';
//import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
import api from '../../../../api'


function Subcategorias() {
    const [nombreSubcategoria, setNombreSubcategoria] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [editar, setEditar] = useState(false);
    const [idSubcategoria, setIdSubcategoria] = useState();
    const [desplegar, setDesplegar] = useState(false);

    // Obtener todas las categorías
    const getCategorias = () => {
        api.get("/categorias").then((response) => {
            setCategorias(response.data);
        });
    };

    // Obtener todas las subcategorías
    const getSubcategorias = () => {
        api.get("/subcategorias").then((response) => {
            setSubcategorias(response.data);
        });
    };

    useEffect(() => {
        getCategorias();
        getSubcategorias();
    }, []);

    // Agregar nueva subcategoría
    const addSubcategoria = () => {
        if (!categoriaSeleccionada) {
            Swal.fire({
                icon: "warning",
                title: "Seleccione una categoría",
            });
            return;
        }

        api.post("/subcategorias", {
            nombre: nombreSubcategoria,
            categoria_id: categoriaSeleccionada,
        })
            .then(() => {
                getSubcategorias();
                setNombreSubcategoria("");
                setCategoriaSeleccionada("");
                Swal.fire({
                    title: "Subcategoría agregada",
                    icon: "success",
                    timer: 2000,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            });
    };

    // Editar subcategoría
    const editarSubcategoria = (subcategoria) => {
        setEditar(true);
        setNombreSubcategoria(subcategoria.nombre);
        setCategoriaSeleccionada(subcategoria.categoria_id);
        setIdSubcategoria(subcategoria.id);
    };

    const putSubcategoria = () => {
        api.put(`/subcategorias/${idSubcategoria}`, {
            nombre: nombreSubcategoria,
            categoria_id: categoriaSeleccionada,
        })
            .then(() => {
                getSubcategorias();
                setNombreSubcategoria("");
                setCategoriaSeleccionada("");
                setEditar(false);
                Swal.fire({
                    title: "Subcategoría modificada",
                    icon: "success",
                    timer: 2000,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            });
    };

    // Eliminar subcategoría
    const deleteSubcategoria = (id) => {
        Swal.fire({
            title: "Eliminar",
            text: `¿Desea eliminar esta subcategoría?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/subcategorias/${id}`).then(() => {
                    getSubcategorias();
                    Swal.fire({
                        title: "Eliminada!",
                        text: "Subcategoría eliminada con éxito",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                });
            }
        });
    };

    return (
        <div className="container-fluid" style={{ padding: '20px', border: '1px solid #000', borderRadius: '40px' }}>
            <div className="card" style={{ border: 'none', borderRadius: '15px', width: '100%' }}>
                <h4 className="" style={{ color: '#000', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Agregar Subcategorías
                </h4>
                <div className="card-body d-flex justify-content-center">
                    <div className="input-group mb-3" style={{ width: '80%' }}>
                        <input
                            className="form-control"
                            type="text"
                            onChange={(event) => setNombreSubcategoria(event.target.value)}
                            placeholder="Escribe una subcategoría..."
                            value={nombreSubcategoria}
                            style={{ borderRadius: '10px 0 0 10px', border: '1px solid #000' }}
                        />
                        <select
                            className="form-select"
                            value={categoriaSeleccionada}
                            onChange={(event) => setCategoriaSeleccionada(event.target.value)}
                            style={{ borderRadius: '0', border: '1px solid #000' }}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                        <button
                            className="btn btn-success"
                            onClick={editar ? putSubcategoria : addSubcategoria}
                            style={{ color: '#FFF', borderRadius: '0 10px 10px 0', fontWeight: 'bold', border: '1px solid #000' }}
                        >
                            {editar ? "Actualizar" : "Agregar"}
                        </button>
                    </div>
                </div>
                <div className="text-body-secondary text-center">
                    <button
                        className="btn text-center"
                        onClick={() => setDesplegar(!desplegar)}
                        style={{ backgroundColor: '#8e99a2', color: '#fff', borderRadius: '5px', fontWeight: 'bold' }}
                    >
                        {desplegar ? (
                            <><i className="bi bi-caret-up-fill"></i> Ocultar Subcategorías</>
                        ) : (
                            <><i className="bi bi-caret-down-fill"></i> Ver Subcategorías</>
                        )}
                    </button>
                </div>
            </div>

            {desplegar && (
                <div className="mt-3" style={{ width: '100%' }}>
                    <table className="table" style={{ backgroundColor: '#F7C1CA', borderRadius: '15px', overflow: 'hidden', width: '100%' }}>
                        <tbody>
                            {subcategorias.map((subcategoria, index) => (
                                <tr key={subcategoria.id} style={{ color: '#000', fontWeight: 'bold', borderBottom: '1px solid #000' }}>
                                    <td style={{ padding: '15px', width: '50%' }}>{subcategoria.nombre}</td>
                                    <td style={{ padding: '15px', width: '30%' }}>
                                        {categorias.find((cat) => cat.id === subcategoria.categoria_id)?.nombre || "Sin Categoría"}
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                onClick={() => editarSubcategoria(subcategoria)}
                                                className="btn btn-warning"
                                                style={{ border: '1px', color: '#000', fontWeight: 'bold', borderRadius: '5px 0 0 5px' }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteSubcategoria(subcategoria.id)}
                                                className="btn btn-danger"
                                                style={{ border: '1px', color: '#fff', fontWeight: 'bold', borderRadius: '0 5px 5px 0' }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Subcategorias;
