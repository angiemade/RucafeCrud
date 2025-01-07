import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AlmuerzosCena.scss';
import Header from '../../Home/Header/Header';
import Footer from './Footer/Footer';

const menuItems = [
  { name: 'Para Picar', route: '/para-picar' },
  { name: 'Pizzas', route: '/pizzas' },
  { name: 'Hamburguesas y Sándwiches', route: '/hamburguesas-y-sandwiches' },
  { name: 'Al Plato', route: '/al-plato' }
];

export default function AlmuerzosCenas() {

  const navigate = useNavigate();

  const navegacion = (route) => {
    navigate(route);
  };

  return (
    <div className='almuerzos-cenas'>
      <div className='almuerzos-cenas-header'>
        <Header />
      </div>
      <div className='Boton_retroceso'>
        <button className='Boton' onClick={() => navigate(-1)}>Atrás</button>
      </div>
      <div className='Button-menu'>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className='Button'
            onClick={() => navegacion(item.route)}
          >
            <p>{item.name}</p>
            <span className='arrow'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m6.05 19l5-7l-5-7H8.5l5 7l-5 7zM12 19l5-7l-5-7h2.45l5 7l-5 7z" />
              </svg>
            </span>
          </button>
        ))}
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}
