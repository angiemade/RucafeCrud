// import React from 'react'
// // import Categorias from '../Categorias/Categorias'
// // import Subcategorias from '../Subcategorias/Subcategorias'
// import Productos from '../Productos/Productos'
// import Promos from '../Promos/Promos'
// import CrearProductos from '../Productos/CrearProductos'

// function HomeAdmin() {
//   return (
//     <div>
//       {/* <div> <Categorias/> </div>
//       <div> <Subcategorias/> </div> */}
//       <div><CrearProductos/></div>
//       <div><Promos/></div>
//       <div><Productos/></div>
//     </div>
//   )
// }

// export default HomeAdmin



import React from 'react';
import { useNavigate } from 'react-router-dom';
import CrearProductos from '../Productos/CrearProductos';
import Promos from '../Promos/Promos';
import Productos from '../Productos/Productos';

function HomeAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <button
        className="btn btn-secondary d-flex align-items-center"
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          borderRadius: '25px',
          backgroundColor: '#f8bfc4',
          color: '#000',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <i className="bi bi-box-arrow-right"></i>
        <span className="d-none d-md-inline ms-2">Cerrar Sesión</span>
      </button>

      <div style={{ marginTop: '80px' }}>
        <CrearProductos />
        <Promos />
        <Productos />
      </div>
    </div>
  );
}

export default HomeAdmin;


