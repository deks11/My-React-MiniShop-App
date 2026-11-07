import { Link } from "react-router-dom";
import styles from "./Card.module.css";

import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function Card({ product }) {
  const { addToCart } = useCart();

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(product.id);

  return (
    <div className={styles.card}>

      <button
        className={`${styles.favoriteButton} ${
          favorite ? styles.favoriteActive : ""
        }`}
        onClick={() => toggleFavorite(product)}
        aria-label="Add to favorites"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

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

        <button
          className={styles.addToCart}
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>

      </div>
    </div>
  );
}

export default Card;