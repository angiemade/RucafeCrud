import React from 'react';
import styles from './Menu.module.scss';
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
