import React from 'react';
import style from './MilanesasAlPlato.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Home/Header/Header';

export default function MilanesasAlPlato() {
  const Milanesas_Items = [
    { name: "Milanesa Común con papas o ensalada", descripcion: "", price: "$8400" },
    { name: "Milanesa Napolitana con papas o ensalada", descripcion: "", price: "$8900" },
    { name: "Milanesa a Caballo con papas o ensalada", descripcion: "", price: "$8900" },
    { name: "Milanesa a la Suiza con papas o ensalada", descripcion: "", price: "$9300" },
    { name: "Milanesa de pollo Común con papas o ensalada", descripcion: "", price: "$8100" },
    { name: "Milanesa de pollo Napolitana con papas o ensalada", descripcion: "", price: "$8600" },
    { name: "Milanesa de pollo a Caballo con papas o ensalada", descripcion: "", price: "$8600" },
    { name: "Milanesa de pollo a la Suiza con papas o ensalada", descripcion: "", price: "$9000" },
  ];

  const navigate = useNavigate();

  const ItemsList = ({ items }) => (
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
  );

  return (
    <div className={style.MilanesasAlPlato}>
       <Header /> 
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Milanesas al Plato</h2>
        <ItemsList items={Milanesas_Items} />
      </div>
    </div>
  );
}
