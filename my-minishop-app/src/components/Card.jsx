import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ product }) {
  return (
    <div className={styles.card}>

      <Link
        to={`/product/${product.id}`}
        className={styles.imageLink}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
      </Link>

      <div className={styles.content}>

        <span className={styles.category}>
          {product.category}
        </span>

        <h3>{product.title}</h3>

        <p className={styles.description}>
          {product.description}
        </p>

        <div className={styles.footer}>

          <span className={styles.price}>
            ${product.price}
          </span>

          <Link
            to={`/product/${product.id}`}
            className={styles.button}
          >
            View Product
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Card;