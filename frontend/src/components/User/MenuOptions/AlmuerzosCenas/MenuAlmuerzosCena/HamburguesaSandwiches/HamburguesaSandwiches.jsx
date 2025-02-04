import React, { useEffect, useState } from 'react';
import style from './HamburguesaSandwiches.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Home/Header/Header';

export default function HamburguesaSandwiches() {
  const [hamburguesaItems, setHamburguesaItems] = useState([]);
  const [milanesaItems, setMilanesaItems] = useState([]);
  const [lomitoItems, setLomitoItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Hamburguesas"
    fetch('http://localhost:3001/productos/filter?subcategoria=Hamburguesas')
      .then((res) => res.json())
      .then((data) => setHamburguesaItems(data))
      .catch((error) =>
        console.error('Error fetching Hamburguesas items:', error)
      );

    // Obtener productos de la subcategoría "Milanesas"
    fetch('http://localhost:3001/productos/filter?subcategoria=Sandwiches%20de%20milanesa')
      .then((res) => res.json())
      .then((data) => setMilanesaItems(data))
      .catch((error) =>
        console.error('Error fetching Milanesas items:', error)
      );

    // Obtener productos de la subcategoría "Lomitos"
    fetch('http://localhost:3001/productos/filter?subcategoria=Lomitos')
      .then((res) => res.json())
      .then((data) => setLomitoItems(data))
      .catch((error) =>
        console.error('Error fetching Lomitos items:', error)
      );
  }, []);

  const ItemsList = ({ title, items }) => (
    <>
      <h2 className={style.titulo}>{title}</h2>
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
    </>
  );

  return (
    <div className={style.HamburguesasSandwiches}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <ItemsList title="Hamburguesas" items={hamburguesaItems} />
        <ItemsList title="Milanesas" items={milanesaItems} />
        <ItemsList title="Lomitos" items={lomitoItems} />
      </div>
    </div>
  );
}
