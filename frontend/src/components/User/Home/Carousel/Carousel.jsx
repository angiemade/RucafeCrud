import React from 'react';
import styles from '../Carousel/Carousel.module.scss';
import image2 from '../../../../assets/Promo1.png';
import image3 from '../../../../assets/Promo2.png';
import image4 from '../../../../assets/Promo3.png';
import image1 from '../../../../assets/Promo4.png';

const images = [
  { src: image1, alt: 'Promo 1', description: '1 Licuados + 1/2 Jamón y Queso', precio: '$5200' },
  { src: image2, alt: 'Promo 2', description: '2 Licuados (mismo sabor) + 1 Jamón y Queso', precio: '$9800' },
  { src: image3, alt: 'Promo 3', description: '2 Infusiones + 1 de Jamón y Queso', precio: '$8400' },
  { src: image4, alt: 'Promo 4', description: '1 Infusion + 1/2 de Jamón y Queso', precio: '$4600' }
];


export default function Carousel() {
  return (
    <div>
      <div className={styles.Carousel_container}>
        {images.map((image, index) => (
          <div key={index} className={styles.Carousel_item}>
            <img src={image.src} alt={image.alt} />
            <div className={styles.despiption}>
              {image.description}
              <br />
              {image.precio}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}