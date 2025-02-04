import React, { useEffect, useState } from 'react';
import style from './Licuados.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function Licuados() {
  const [lItems, setLItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Licuados"
    fetch('http://localhost:3001/productos/filter?subcategoria=Licuados')
      .then((res) => res.json())
      .then((data) => {
        setLItems(data);
      })
      .catch((error) => console.error('Error fetching Licuados items:', error));
  }, []);

  const LicuadosItems = ({ name, price, descripcion }) => (
    <li className={style.item}>
      <div>
        <p className={style.itemName}>{name}</p>
        {descripcion && (
          <p className={style.itemDescription}>{descripcion}</p>
        )}
      </div>
      <div className={style.itemPriceContainer}>
        <span className={style.itemPrice}>${parseInt(price)}</span>
      </div>
    </li>
  );

  return (
    <div className={style.Licuados}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Licuados</h2>
        <ul className={style.items}>
          {lItems.map((item, index) => (
            <LicuadosItems
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
