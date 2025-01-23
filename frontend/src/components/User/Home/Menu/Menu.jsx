import React from 'react';
import styles from '../Menu/Menu.module.scss';
import { useNavigate } from 'react-router-dom';

const menuItems = [

  { name: 'Desayunos & Meriendas', route: '/desayunos-meriendas' },
  { name: 'Cafetería & Panadería', route: '/cafeteria-panaderia' },
  { name: 'Sándwiches', route: '/sandwiches' },
  { name: 'Licuados', route: '/licuados' },
  { name: 'Bebidas', route: '/bebidas' },
  { name: 'Almuerzos & Cenas', route: '/almuerzos-cenas' }
];


export default function Menu() {

  const navigate = useNavigate();

  const navegacion = (route) => {
    navigate(route);
  };


  return (
    <div className={styles.Button_menu}>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={styles.Button}
          onClick={() => navegacion(item.route)}
        >
          <p>{item.name}</p>
          <span className={styles.arrow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24">
              <path fill="currentColor" d="m6.05 19l5-7l-5-7H8.5l5 7l-5 7zM12 19l5-7l-5-7h2.45l5 7l-5 7z" />
            </svg>
          </span>
        </button>
      ))}
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styles from '../Menu/Menu.module.scss';

// export default function Menu() {
//   const [categorias, setCategorias] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:3001/categorias')
//       .then(response => {
//         setCategorias(response.data); // Obtener categorías desde la API
//       })
//       .catch(error => {
//         console.error('Error al cargar categorías:', error);
//       });
//   }, []);

//   return (
//     <div className={styles.home}>
//       <h1 className={styles.titulo}>Menú Principal</h1>
//       {categorias.map(categoria => (
//         <button
//           key={categoria.id}
//           className={styles.boton}
//           onClick={() => navigate(`/categoria/${categoria.nombre}`)}
//         >
//           {categoria.nombre}
//         </button>
//       ))}
//     </div>
//   );
// }
