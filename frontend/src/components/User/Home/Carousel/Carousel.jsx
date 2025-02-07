import React, { useEffect, useState } from "react";
import styles from "../Carousel/Carousel.module.scss";
import image2 from "../../../../assets/Promo1.png";
import image3 from "../../../../assets/Promo2.png";
import image4 from "../../../../assets/Promo3.png";
import image1 from "../../../../assets/Promo4.png";

// Arreglo local de imágenes y textos alternativos (en el orden deseado)
const localImages = [image1, image2, image3, image4];
const localAlts = ["Promo 1", "Promo 2", "Promo 3", "Promo 4"];

export default function Carousel() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    // Obtener promociones desde el backend
    fetch("http://localhost:3001/promos")
      .then((res) => res.json())
      .then((data) => setPromos(data))
      .catch((error) => console.error("Error fetching promos:", error));
  }, []);

  return (
    <div>
      <div className={styles.Carousel_container}>
        {promos.map((promo, index) => (
          <div key={promo.id} className={styles.Carousel_item}>
            <img
              src={localImages[index % localImages.length]}
              alt={localAlts[index % localAlts.length]}
            />
            <div className={styles.despiption}>
              {promo.nombre}
              <br />
              ${parseInt(promo.precio)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
