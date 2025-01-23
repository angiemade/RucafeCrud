import React from 'react';
import style from './Pizzas.module.scss';
import Header from '../../../../Home/Header/Header';
import { useNavigate } from 'react-router-dom';

export default function Pizzas() {
  const P_Items = [
    { name: "Común / Muzzarella", descripcion: "Queso muzzarella + Aceitunas", price1: "$9800", price2: "$5800" },
    { name: "Especial", descripcion: "Queso muzzarella, Jamón cocido + Aceitunas y Morrones", price1: "$10100", price2: "$5900" },
    { name: "Fugazzeta", descripcion: "Queso muzzarella + Cebolla + Aceitunas", price1: "$10100", price2: "$5900" },
    { name: "Napolitana", descripcion: "Queso muzzarella + Tomate + Aceitunas", price1: "$10000", price2: "$6000" },
    { name: "Ternera", descripcion: "Queso muzzarella + Ternera + Aceitunas y Morrones", price1: "$11300", price2: "$6500" },
    { name: "Calabresa", descripcion: "Queso muzzarella + Pepperoni + Aceitunas", price1: "$11300", price2: "$6500" },
    { name: "Rúcula", descripcion: "Queso muzzarella + Rúcula + Tomate", price1: "S/P", price2: "S/P" },
    { name: "Ruca", descripcion: "Queso muzarella + Papas fritas + Aceitunas", price1: "$11300", price2: "$6500" },
  ];

  const navigate = useNavigate();

  return (
    <div className={style.Pizzas}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Pizzas</h2>
        <div className={style.preciosBox}>
          <p>8 porciones</p>
          <p>4 porciones</p>
        </div>
        <ul className={style.items}>
          {P_Items.map((item, index) => (
            <li key={index} className={style.item}>
              <div>
                <p className={style.itemName}>{item.name}</p>
                {item.descripcion && <p className={style.itemDescription}>{item.descripcion}</p>}
              </div>
              <div className={style.itemPriceContainer}>
                <span className={style.itemPrice}>{item.price1}</span>
                <span className={style.itemPrice}>{item.price2}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
