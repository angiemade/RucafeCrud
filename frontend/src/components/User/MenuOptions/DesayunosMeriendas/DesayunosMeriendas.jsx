import React, { useEffect, useState } from 'react';
import style from '../DesayunosMeriendas/DesayunosMeriendas.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';
import api from '../../../../../api'; // Ajusta la ruta según la estructura de tu proyecto

export default function DesayunosMeriendas() {
  const [DM_items, setDM_items] = useState([]);
  const [A_items, setA_items] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Desayunos y Meriendas"
    api.get('/productos/filter?subcategoria=Desayunos%20y%20Meriendas')
      .then((res) => setDM_items(res.data))
      .catch((error) => console.error('Error fetching DM_items:', error));

    // Obtener productos de la subcategoría "Agregados"
    api.get('/productos/filter?subcategoria=Agregados')
      .then((res) => setA_items(res.data))
      .catch((error) => console.error('Error fetching A_items:', error));
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
            <span className={style.itemPrice}>${parseInt(item.precio)}</span>
            {item.precio2 && (
              <span className={style.itemPrice}>${parseInt(item.precio2)}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.DesayunosMeriendas}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Desayunos y Meriendas</h2>
        <ItemsList items={DM_items} />
        <h2 className={style.titulo}>Agregados</h2>
        <ItemsList items={A_items} />
      </div>
    </div>
  );
}
