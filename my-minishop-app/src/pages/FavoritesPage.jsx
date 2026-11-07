import { Link } from "react-router-dom";

import Card from "../components/Card";

import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section>

      <h1 className="page-title">
        My Favorites ❤️
      </h1>

      {favorites.length === 0 ? (
        <div className="empty-cart">

          <h2>No favorite products yet.</h2>

          <p>Click the heart on a product to save it here.</p>

          <Link to="/" className="continue-shopping">
            Explore Products
          </Link>

        </div>
      ) : (
        <div className="products-grid">

          {favorites.map((product) => (
            <Card
              key={product.id}
              product={product}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default FavoritesPage;