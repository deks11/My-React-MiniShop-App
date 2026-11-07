import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function Header({
  darkMode,
  setDarkMode,
  search,
  setSearch,
  categories,
}) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { cartCount } = useCart();

  const { favorites } = useFavorites();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    if (category === "all") {
      navigate("/");
    } else {
      navigate(`/category/${category}`);
    }
  };

  return (
    <header className="header">
      <div className="header-container">

        <NavLink to="/" className="logo">
          Mini<span>Shop.</span>
        </NavLink>

        <nav className="navigation">

          <NavLink to="/" end>
            Home
          </NavLink>

          <select
            onChange={handleCategoryChange}
            defaultValue="all"
            className="category-select"
          >
            <option value="all">All Categories</option>

            {categories?.map((category) => (
              <option
                key={category.slug}
                value={category.slug}
              >
                {category.name}
              </option>
            ))}
          </select>

        </nav>

        <div className="header-actions">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <NavLink to="/favorites" className="header-icon">
            ❤️
            <span className="header-count">
              {favorites.length}
            </span>
          </NavLink>

          <NavLink to="/cart" className="header-icon">
            🛒
            <span className="header-count">
              {cartCount}
            </span>
          </NavLink>

          {user ? (
            <div className="user-actions">

              <span className="user-greeting">
                Hello, {user.name}
              </span>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="auth-actions">

              <NavLink to="/auth" className="login-link">
                Login
              </NavLink>

              <NavLink to="/auth" className="register-link">
                Register
              </NavLink>

            </div>
          )}

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;