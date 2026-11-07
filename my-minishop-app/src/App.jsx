import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Card from "./components/Card";

import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";

import useFetch from "./hooks/useFetch";
import { useAuth } from "./context/AuthContext";

const PRODUCTS_PER_PAGE = 8;

// PAGINATION
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>
  );
}

// PRODUCT LIST
function ProductList({ products, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  if (loading) {
    return <h2 className="message">Loading products...</h2>;
  }

  if (error) {
    return <h2 className="message">{error}</h2>;
  }

  const totalPages = Math.ceil(
    products.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <>
      <div className="products-grid">

        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <h2 className="message">
            No products found.
          </h2>
        )}

      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

// HOME PAGE
function Home({ search }) {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products?limit=0"
  );

  const filteredProducts =
    data?.products?.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  return (
    <section>

      <h1 className="page-title">
        Our Products
      </h1>

      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
      />

    </section>
  );
}

// CATEGORY PAGE
function CategoryPage({ search }) {
  const { category } = useParams();

  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
  );

  const filteredProducts =
    data?.products?.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  return (
    <section>

      <h1 className="page-title">
        {category.replaceAll("-", " ")}
      </h1>

      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
      />

    </section>
  );
}

// PRODUCT DETAILS
function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading) {
    return <h2 className="message">Loading product...</h2>;
  }

  if (error) {
    return <h2 className="message">{error}</h2>;
  }

  if (!product) {
    return <h2 className="message">Product not found.</h2>;
  }

  return (
    <section className="product-details">

      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="details-content">

        <span>{product.category}</span>

        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <h2>${product.price}</h2>

        <p>⭐ Rating: {product.rating}</p>

        <p>Brand: {product.brand || "Unknown"}</p>

        <p>Stock: {product.stock}</p>

        <p>Discount: {product.discountPercentage}%</p>

      </div>

    </section>
  );
}

// MAIN APP
function App() {
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [search, setSearch] = useState("");

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("https://dummyjson.com/products/categories");

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  if (!user) {
    return <AuthPage />;
  }

  return (
    <>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        search={search}
        setSearch={setSearch}
        categories={
          categoriesLoading || categoriesError
            ? []
            : categories || []
        }
      />

      <main className="main-container">

        <Routes>

          <Route
            path="/"
            element={<Home search={search} />}
          />

          <Route
            path="/category/:category"
            element={<CategoryPage search={search} />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />

          <Route
            path="/auth"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </main>

      <footer className="footer-section">
        <p>© 2026 MiniShop. All rights reserved.</p>
      </footer>

    </>
  );
}

export default App;