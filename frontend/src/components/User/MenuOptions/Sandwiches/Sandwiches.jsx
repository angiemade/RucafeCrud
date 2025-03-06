import React, { useEffect, useState } from 'react';
import style from './Sandwiches.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';
import api from '../../../../../api'; // Ajusta la ruta según la estructura de tu proyecto

export default function Sandwiches() {
  const [sItems, setSItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Sándwiches" usando Axios
    api.get('/productos/filter?subcategoria=Sándwiches')
      .then((res) => setSItems(res.data))
      .catch((error) => console.error('Error fetching Sandwiches items:', error));
  }, []);

  const SandwichesItems = ({ name, price, descripcion }) => (
    <li className={style.item}>
      <div>
        <p className={style.itemName}>{name}</p>
        {descripcion && <p className={style.itemDescription}>{descripcion}</p>}
      </div>
      <div className={style.itemPriceContainer}>
        <span className={style.itemPrice}>${parseInt(price)}</span>
      </div>
    </li>
  );

  return (
    <div className={style.Sandwiches}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Sándwiches</h2>
        <ul className={style.items}>
          {sItems.map((item, index) => (
            <SandwichesItems
              key={index}
              name={item.nombre}
              price={item.precio}
              descripcion={item.descripcion}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
