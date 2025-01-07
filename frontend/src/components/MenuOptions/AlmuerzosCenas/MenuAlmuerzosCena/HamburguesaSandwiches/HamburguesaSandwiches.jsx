import React from 'react';
import style from './HamburguesaSandwiches.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Home/Header/Header';

export default function HamburguesaSandwiches() {
  const hamburguesaItems = [
    { name: "Común / Clásica", descripcion: "Con lechuga, tomate y aderezos", price: "$5800" },
    { name: "Super", descripcion: "Con Jamón, queso, lechuga, tomate y aderezos", price: "$6800" },
    { name: "Ruca", descripcion: "Con Huevo, jamón, queso, lechuga, tomate y aderezos + Papas Fritas", price: "$7800" },
  ];

  const lomitoItems = [
    { name: "Común / Clásico", descripcion: "Con lechuga, tomate y aderezos", price: "$7200" },
    { name: "Super", descripcion: "Con Jamón, queso, lechuga, tomate y aderezos", price: "$8200" },
    { name: "Ruca", descripcion: "Con Huevo, jamón, queso, lechuga, tomate y aderezos + Papas Fritas", price: "$9200" },
  ];

  const milanesaItems = [
    { name: "Común / Clásica", descripcion: "Con lechuga, tomate y aderezos", price: "$6600" },
    { name: "Super", descripcion: "Con Jamón, queso, lechuga, tomate y aderezos", price: "$7600" },
    { name: "Ruca", descripcion: "Con Huevo, jamón, queso, lechuga, tomate y aderezos + Papas Fritas", price: "$8600" },
  ];

  const navigate = useNavigate();

  const ItemsList = ({ title, items }) => (
    <>
      <h2 className={style.titulo}>{title}</h2>
      <ul className={style.items}>
        {items.map((item, index) => (
          <li key={index} className={style.item}>
            <div>
              <p className={style.itemName}>{item.name}</p>
              {item.descripcion && <p className={style.itemDescription}>{item.descripcion}</p>}
            </div>
            <div className={style.itemPriceContainer}>
              <span className={style.itemPrice}>{item.price}</span>
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
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <ItemsList title="Hamburguesas" items={hamburguesaItems} />
        <ItemsList title="Milanesas" items={milanesaItems} />
        <ItemsList title="Lomitos" items={lomitoItems} />
      </div>
    </div>
  );
}
