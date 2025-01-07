import React from 'react';
import style from './Sandwiches.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function Sandwiches() {
  const S_items = [
    { name: "1/2 Jamón y Queso", descripcion: "", price: "$2700" },
    { name: "Triple Jamón y Queso", descripcion: "", price: "$4400" },
    { name: "Triple Jamón, Queso y Tomate", descripcion: "", price: "$4600" },
    { name: "Triple de Ternera y Queso", descripcion: "", price: "$5300" },
    { name: "Triple de Ternera, Queso y Tomate", descripcion: "", price: "$5500" },
    { name: "Triple de Ternera + Lechuga y Tomate", descripcion: "", price: "$5700" },
    { name: "Triple de Pollo, Lechuga y Tomate", descripcion: "", price: "$5500" },
    { name: "Triple de Pollo, Queso y Tomate", descripcion: "", price: "$5700" },
  ];

  const navigate = useNavigate();

  const SandwichesItems = ({ name, price, descripcion }) => (
    <li className={style.item}>
      <div>
        <p className={style.itemName}>{name}</p>
        {descripcion && <p className={style.itemDescription}>{descripcion}</p>}
      </div>
      <div className={style.itemPriceContainer}>
        <span className={style.itemPrice}>{price}</span>
      </div>
    </li>
  );

  return (
    <div className={style.Sandwiches}>
       <Header /> 
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Sándwiches</h2>
        <ul className={style.items}>
          {S_items.map((item, index) => (
            <SandwichesItems
              key={index}
              name={item.name}
              price={item.price}
              descripcion={item.descripcion}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
