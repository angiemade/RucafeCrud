import React, { useEffect, useState } from 'react';
import style from './ParaPicar.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Home/Header/Header';
import api from '../../../../../../../api'; // Ajusta la ruta según tu estructura

export default function ParaPicar() {
  const [picarItems, setPicarItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamado al endpoint para obtener productos de la subcategoría "Para Picar" usando Axios
    api.get('/productos/filter?subcategoria=Para%20Picar')
      .then((res) => setPicarItems(res.data))
      .catch((error) =>
        console.error('Error fetching Para Picar items:', error)
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
              {isNaN(Number(item.precio))
                ? item.precio
                : `$${parseInt(item.precio)}`}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.ParaPicar}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Para Picar</h2>
        <ItemsList items={picarItems} />
      </div>
    </div>
  );
}
