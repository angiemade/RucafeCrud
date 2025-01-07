import React from 'react';
import style from '../CafeteriaPanaderia/CafeteriaPanaderia.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function CafeteriaPanaderia() {
  const Ca_items = [
    { name: "Pocillo / Cortado", descripcion: "Café o Café con leche Chico", price: "$1700" },
    { name: "Café en jarrita", descripcion: "Café o Café con leche en Jarrita", price: "$1800" },
    { name: "Café con leche", descripcion: "Grande", price: "$2200" },
    { name: "Cortado doble", descripcion: "Doble ración de café", price: "$2300" },
    { name: "Macchiato", descripcion: "Café con espuma", price: "$2400" },
    { name: "Lágrima", descripcion: "Poco café y mucha leche", price: "$2200" },
    { name: "Cappuccino", descripcion: "Café con leche y mucha espuma con canela o chocolate", price: "$3000" },
    { name: "Té con leche", descripcion: "", price: "$2200" },
    { name: "Té", descripcion: "", price: "$1800" },
    { name: "Mate cocido", descripcion: "", price: "$1800" },
    { name: "Submarino", descripcion: "", price: "$2900" },
    { name: "Capuchino con Crema", descripcion: "", price: "$3700" },
  ];

  const P_items = [
    { name: "Tortilla", descripcion: "", price: "$800" },
    { name: "Tostadas", descripcion: "Negra, negra con semilla, de campo, pan francés", price: "$800" },
    { name: "Medialunas", descripcion: "", price: "$800" },
    { name: "Medialunas con jamón y queso", descripcion: "", price: "$2100" },
    { name: "Croissant", descripcion: "", price: "S/P" },
    { name: "Croissant con jamón y queso", descripcion: "", price: "S/P" },
    { name: "Alfajores", descripcion: "(Consultar variedad)", price: "S/P" },
    { name: "Medialuna con Dulce de Leche", descripcion: "", price: "$2100" },
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
    <div className={style.CafeteriaPanaderia}>
      <Header /> 
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Cafetería</h2>
        <ItemsList items={Ca_items} />
        <h2 className={style.titulo}>Panadería</h2>
        <ItemsList items={P_items} />
      </div>
    </div>
  );
}
