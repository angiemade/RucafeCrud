import React from 'react';
import style from '../Bebidas/Bebidas.module.scss';
//import Header from '../AlmuerzosCenas/Header/Header';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function Bebidas() {
  const SinAlcohol_items = [
    { name: 'Gaseosa línea Coca Cola 350ml', descripcion: "", price: '$2300' },
    { name: 'Gaseosa línea Coca Cola 1 litro', descripcion: "", price: '$3400' },
    { name: 'Agua Saborizada 500ml', descripcion: "", price: '$2400' },
    { name: 'Agua mineral con gas / sin gas', descripcion: "", price: '$2200' },
    { name: 'Jugo de naranja jarrita', descripcion: "", price: '$2900' },
    { name: 'Jugo de naranja 1 litro', descripcion: "", price: '$4100' },
    { name: 'Limonada jarrita', descripcion: "", price: '$3000' },
    { name: 'Limonada 1 litro', descripcion: "", price: '$4100' }
  ];

  const ConAlcohol_items = [
    { name: 'Cerveza en latas', descripcion: "(Consultar variedad)", price: '$3000' },
    { name: 'Quilmes 1 litro', descripcion: "", price: '$4300' },
    { name: 'Salta Negra 1 litro', descripcion: "", price: '$4300' },
    { name: 'Heineken 1 litro', descripcion: "", price: '$7000' },
    { name: 'Stella Artois 1 litro', descripcion: "", price: '$7000'}
  ];

  const navigate = useNavigate();

  // Componente interno para los ítems
  const BebidasItems = ({ name, price, descripcion }) => (
    <li className={style.item}>
      <div>
        <p className={style.itemName}>{name}</p>
        <p className={style.itemDescription}>{descripcion}</p>
      </div>
      <div className={style.itemPriceContainer}>
        <span className={style.itemPrice}>{price}</span>
      </div>
    </li>
  );

  return (
    <div className={style.Bebidas}>
       <Header/> 
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Sin Alcohol</h2>
        <ul className={style.items}>
          {SinAlcohol_items.map((item, index) => (
            <BebidasItems
              key={index}
              name={item.name}
              price={item.price}
              descripcion={item.descripcion}
            />
          ))}
        </ul>
        <h2 className={style.titulo}>Con Alcohol</h2>
        <ul className={style.items}>
          {ConAlcohol_items.map((item, index) => (
            <BebidasItems
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
