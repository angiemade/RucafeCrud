import React, { useEffect, useState } from 'react';
import style from './Bebidas.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function Bebidas() {
  const [sinAlcoholItems, setSinAlcoholItems] = useState([]);
  const [conAlcoholItems, setConAlcoholItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Sin Alcohol"
    fetch('http://localhost:3001/productos/filter?subcategoria=Sin%20Alcohol')
      .then((res) => res.json())
      .then((data) => {
        setSinAlcoholItems(data);
      })
      .catch((error) => console.error('Error fetching Sin Alcohol items:', error));

    // Obtener productos de la subcategoría "Con Alcohol"
    fetch('http://localhost:3001/productos/filter?subcategoria=Con%20Alcohol')
      .then((res) => res.json())
      .then((data) => {
        setConAlcoholItems(data);
      })
      .catch((error) => console.error('Error fetching Con Alcohol items:', error));
  }, []);

  // Componente interno para renderizar cada ítem
  const BebidasItems = ({ name, price, descripcion }) => (
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
    <div className={style.Bebidas}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Sin Alcohol</h2>
        <ul className={style.items}>
          {sinAlcoholItems.map((item, index) => (
            <BebidasItems
              key={index}
              name={item.nombre}
              price={item.precio}
              descripcion={item.descripcion}
            />
          ))}
        </ul>
        <h2 className={style.titulo}>Con Alcohol</h2>
        <ul className={style.items}>
          {conAlcoholItems.map((item, index) => (
            <BebidasItems
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
