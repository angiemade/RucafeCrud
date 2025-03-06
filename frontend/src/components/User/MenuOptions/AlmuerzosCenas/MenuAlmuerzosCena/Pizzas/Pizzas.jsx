import React, { useEffect, useState } from 'react';
import style from './Pizzas.module.scss';
import Header from '../../../../Home/Header/Header';
import { useNavigate } from 'react-router-dom';
import api from '../../../../../../../api'; // Ajusta la ruta según tu estructura

export default function Pizzas() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la subcategoría "Pizzas" utilizando la instancia de Axios
    api.get('/productos/filter?subcategoria=Pizzas')
      .then((res) => setPizzaItems(res.data))
      .catch((error) => console.error('Error fetching pizzas:', error));
  }, []);

  // Función para formatear el precio: si es numérico, lo muestra como entero con "$"
  const formatPrice = (price) =>
    isNaN(Number(price)) ? price : `$${parseInt(price)}`;

  return (
    <div className={style.Pizzas}>
      <Header />
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>
          Atrás
        </button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Pizzas</h2>
        <div className={style.preciosBox}>
          <p>8 porciones</p>
          <p>4 porciones</p>
        </div>
        <ul className={style.items}>
          {pizzaItems.map((item, index) => (
            <li key={index} className={style.item}>
              <div>
                <p className={style.itemName}>{item.nombre}</p>
                {item.descripcion && (
                  <p className={style.itemDescription}>{item.descripcion}</p>
                )}
              </div>
              <div className={style.itemPriceContainer}>
                <span className={style.itemPrice}>{formatPrice(item.precio)}</span>
                <span className={style.itemPrice}>{formatPrice(item.precio2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
