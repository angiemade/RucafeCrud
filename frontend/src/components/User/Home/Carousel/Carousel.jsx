import React, { useEffect, useState } from "react";
import styles from "../Carousel/Carousel.module.scss";
import image2 from "../../../../assets/Promo1.png";
import image3 from "../../../../assets/Promo2.png";
import image4 from "../../../../assets/Promo3.png";
import image1 from "../../../../assets/Promo4.png";
import api from '../../../../../api'

// Arreglo local de imágenes y textos alternativos (en el orden deseado)
const localImages = [image1, image2, image3, image4];
const localAlts = ["Promo 1", "Promo 2", "Promo 3", "Promo 4"];

export default function Carousel() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    // Obtener promociones desde el backend usando la instancia de Axios
    api.get("/promos")
      .then((res) => setPromos(res.data))
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
