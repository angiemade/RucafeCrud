import React, { useEffect, useState } from 'react';
import styles from '../Menu/Menu.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamado al endpoint para obtener todas las categorías
    fetch('http://localhost:3001/categorias')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Función para mapear el nombre de la categoría a una ruta
  const mapCategoryToRoute = (categoryName) => {
    switch (categoryName) {
      case 'Desayunos y Meriendas':
        return '/desayunos-meriendas';
      case 'Cafetería y Panadería':
        return '/cafeteria-panaderia';
      case 'Sándwiches':
        return '/sandwiches';
      case 'Licuados':
        return '/licuados';
      case 'Bebidas':
        return '/bebidas';
      case 'Almuerzos y Cenas':
        return '/almuerzos-cenas';
      default:
        return '/'; // O una ruta por defecto
    }
  };

  const handleNavigation = (categoryName) => {
    const route = mapCategoryToRoute(categoryName);
    navigate(route);
  };

  return (
    <div className={styles.Button_menu}>
      {categories.map((cat, index) => (
        <button
          key={index}
          className={styles.Button}
          onClick={() => handleNavigation(cat.nombre)}
        >
          <p>{cat.nombre}</p>
          <span className={styles.arrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25em"
              height="1.25em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6.05 19l5-7l-5-7H8.5l5 7l-5 7zM12 19l5-7l-5-7h2.45l5 7l-5 7z"
              />
            </svg>
          </span>
        </button>
      ))}
    </div>
  );
}
