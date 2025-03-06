import React, { useEffect, useState } from 'react';
import style from '../CafeteriaPanaderia/CafeteriaPanaderia.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';
import api from '../../../../../api'; // Ajusta la ruta según tu estructura

export default function CafeteriaPanaderia() {
  const [caItems, setCaItems] = useState([]);
  const [pItems, setPItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Cafeteria" usando Axios
    api.get('/productos/filter?subcategoria=Cafeteria')
      .then((res) => {
        setCaItems(res.data);
      })
      .catch((error) =>
        console.error('Error fetching Cafeteria items:', error)
      );

    // Obtener productos de la subcategoría "Panaderia" usando Axios
    api.get('/productos/filter?subcategoria=Panaderia')
      .then((res) => {
        setPItems(res.data);
      })
      .catch((error) =>
        console.error('Error fetching Panaderia items:', error)
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
            {item.precio2 && (
              <span className={style.itemPrice}>
                ${parseInt(item.precio2)}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.CafeteriaPanaderia}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Cafetería</h2>
        <ItemsList items={caItems} />
        <h2 className={style.titulo}>Panadería</h2>
        <ItemsList items={pItems} />
      </div>
    </div>
  );
}
