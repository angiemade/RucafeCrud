import React from 'react';
import frase from '../../../../assets/Frase.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import style from '../Footer/Footer.module.scss';

export default function Footer() {
  return (
    <div className={style.footerContainer}>
      {/* Botón de Instagram */}
      <a
        href="https://www.instagram.com/rucafe.tuc/profilecard/?igsh=M3FiaDF3d2p5bWxh"
        target="_blank"
        rel="noopener noreferrer"
        className={style.instagramButton}
      >
        <i className="bi bi-instagram"></i>
        ¡NUESTRO INSTAGRAM!
      </a>

      {/* Imagen debajo del botón */}
      <div className={style.imageContainer}>
        <img src={frase} alt="Frase" />
      </div>
    </div>
  );
}
