import React, { useEffect, useState } from 'react';
import style from './MilanesasAlPlato.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Home/Header/Header';
import api from '../../../../../../../api'; // Ajusta la ruta según tu estructura

export default function MilanesasAlPlato() {
  const [milanesasItems, setMilanesasItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Milanesas al Plato" usando la instancia de Axios
    api.get('/productos/filter?subcategoria=Milanesas%20al%20plato')
      .then((res) => setMilanesasItems(res.data))
      .catch((error) =>
        console.error('Error fetching Milanesas al Plato items:', error)
      );
  }, []);

  const ItemsList = ({ items }) => (
    <ul className={style.items}>
      {items.map((item, index) => (
        <li key={index} className={style.item}>
          <div>
            <p className={style.itemName}>{item.nombre}</p>
            {item.descripcion && (
              <p className={style.itemDescription}>{item.descripcion}</p>
            )}
          </div>
          <div className={style.itemPriceContainer}>
            <span className={style.itemPrice}>
              ${parseInt(item.precio)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.MilanesasAlPlato}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Milanesas al Plato</h2>
        <ItemsList items={milanesasItems} />
      </div>
    </div>
  );
}
