import React from 'react';
import style from '../DesayunosMeriendas/DesayunosMeriendas.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Home/Header/Header';

export default function DesayunosMeriendas() {
  const DM_items = [
    { name: 'CLÁSICO', price: '$2700', description: 'Infusión + 2 Tortillas o Medialunas' },
    { name: 'LIGHT', price: '$4300', description: 'Infusión + Tostadas de Pan Lactal + Mermelada + Queso Crema + Jugo de Naranja + Yogurt con Granola' },
    { name: 'EJECUTIVO', price: '$4000', description: 'Infusión + Tostadas en Pan Lactal + Queso Blanco + Mermelada + Jugo de Naranja' },
    { name: 'PROTEICO', price: '$5400', description: 'Infusión + Tostadas en Pan Lactal Negro + Huevo Revuelto + Jamón Cocido + Queso Crema + Jugo de Naranja' },
    { name: 'MAFALDA', price: '$5500', description: 'Infusión + 2 Medialunas de Jamón y Queso + Jugo de Naranja' },
    { name: 'CONTINENTAL', price: '$4900', description: 'Infusión + Pan de Campo + Manteca, Dulce de Leche o Mermelada + Jugo de Naranja + Ensalada de Fruta' },
    { name: 'SALUDABLE', price: '$3800', description: 'Infusión + 2 Fetas de Queso + 2 Fetas de Jamón + Jugo de Naranja' },
    { name: 'SUPER RUCA', price: '$8100', description: 'Infusión + 1 Omelette + Jugo de Naranja' },
    { name: 'SIN TACC', price: '$3400', description: 'Infusión + Galletas de Arroz + Mermelada + Queso Untable' },
    { name: 'DELICIA DE JAMÓN Y QUESO', price: '$4600', description: 'Infusión + 2 Fetas de Queso + 2 Fetas de Jamón + Tostadas de Pan Lactal Negro' },
    { name: 'AVOCADO', price: '$6800', description: 'Infusión + 2 Tostadas con Palta y Huevo + Jugo de Naranja' },
    { name: 'BRUNCH PARA DOS', price: '$15500', description: '2 Infusiones + 2 Medialunas con Jamón y Queso + 2 Tostadas Negras con Palta y Huevo + 2 Jugos de Naranja + Copón de Granola con Miel y Frutas de Estación' },
  ];

  const A_items = [
    { name: 'Vasito de Yogurt o Jugo Chiquito', price: '$2200' },
    { name: 'Vasito de Yogurt con Granola Chiquito', price: '$2200' },
    { name: 'Compotera de Yogurt con Granola', price: '$3500' },
    { name: 'Porción de Queso / Mermelada / Dulce de Leche / Manteca', price: '$2200' },
    { name: 'Compotera de Ensalada de Frutas', price: '$4000' },
  ];

  const navigate = useNavigate();

  const ItemsList = ({ items }) => (
    <ul className={style.items}>
      {items.map((item, index) => (
        <li key={index} className={style.item}>
          <div>
            <p className={style.itemName}>{item.name}</p>
            {item.description && <p className={style.itemDescription}>{item.description}</p>}
          </div>
          <div className={style.itemPriceContainer}>
            <span className={style.itemPrice}>{item.price}</span>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={style.DesayunosMeriendas}>
      <Header/> 
      <div className={style.Boton_retroceso}>
        <button className={style.Boton} onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className={style.menu}>
        <h2 className={style.titulo}>Desayunos y Meriendas</h2>
        <ItemsList items={DM_items} />
        <h2 className={style.titulo}>Agregados</h2>
        <ItemsList items={A_items} />
      </div>
    </div>
  );
}