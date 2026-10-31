import { NavLink, useNavigate } from "react-router-dom";

function Header({
  darkMode,
  setDarkMode,
  search,
  setSearch,
  categories,
}) {
  const navigate = useNavigate();

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