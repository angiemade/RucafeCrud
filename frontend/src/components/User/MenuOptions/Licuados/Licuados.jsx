import React from 'react';
import style from './Licuados.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function Licuados() {
  const L_items = [
    { name: "Licuado de Chocolate", descripcion: "Leche + Chocolate + Hielo", price: "$2900" },
    { name: "Licuado Simple (con leche o con agua)", descripcion: "Banana, frutilla, durazno, ananá, maracuyá", price: "$2900" },
    { name: "Licuado Especial con jugo de naranja", descripcion: "Frutilla, durazno, maracuyá", price: "$3300" },
    { name: "Frozen Frutal (con leche o con agua)", descripcion: "Incluye mix de banana, frutilla, durazno, ananá, maracuyá", price: "$3500" },
    { name: "Frappuchino", descripcion: "Leche + Chocolate + Cafe + Crema Chantilly", price: "$3800" },
  ];

  const navigate = useNavigate();

  const LicuadosItems = ({ name, price, descripcion }) => (
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
    <div className={style.Licuados}>
       <Header/> 
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Licuados</h2>
        <ul className={style.items}>
          {L_items.map((item, index) => (
            <LicuadosItems
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
