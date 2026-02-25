
import "./navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const CATEGORY_OPTIONS = [
  "All",
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Sports",
  "Beauty",
  "Grocery",
  "Toys",
];

const Navbar = () => {
  const [q, setQ] = useState("");
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [filterOpen, setFilterOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setQ(searchParams.get("search") || "");
  }, [searchParams]);

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (q) params.set("search", q);
    else params.delete("search");
    navigate("/?" + params.toString());
  };

  const applyFilters = () => {
    const p = new URLSearchParams(window.location.search);

    if (filters.category && filters.category !== "All")
      p.set("category", filters.category);
    else p.delete("category");

    if (filters.minPrice) p.set("minPrice", filters.minPrice);
    else p.delete("minPrice");

    if (filters.maxPrice) p.set("maxPrice", filters.maxPrice);
    else p.delete("maxPrice");

    navigate("/?" + p.toString());
    setFilterOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav__brand" onClick={() => navigate("/")}>
        mini<span>zon</span>
      </div>

      <form className="nav__search" onSubmit={submit}>
        <input
          className="nav__input"
          placeholder="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="nav__btn" type="submit">
          Search
        </button>
      </form>

      <div className="filter-box">
        <button className="filter-btn" onClick={() => setFilterOpen(!filterOpen)}>
          Filters ▾
        </button>

        {filterOpen && (
          <div className="filter-dropdown">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((v) => ({ ...v, category: e.target.value }))
              }
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <label>Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((v) => ({ ...v, minPrice: e.target.value }))
              }
            />

            <label>Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((v) => ({ ...v, maxPrice: e.target.value }))
              }
            />

            <button className="apply-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        )}
      </div>

      <nav className="nav__links">
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <span className="nav__user">Hi, {user.name}</span>
            <Link to="/my-products">My Products</Link>
            <Link to="/add-product">Sell</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;