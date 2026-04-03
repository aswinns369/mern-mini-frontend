import "./navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";

const CATEGORY_OPTIONS = [
  "All", "Electronics", "Clothing", "Home", "Books", "Sports", "Beauty", "Grocery", "Toys",
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <>
      {/* Mobile Drawer Overlay */}
      <div className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`} onClick={() => setIsDrawerOpen(false)}></div>
      
      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="myntra-logo">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-2.5 2.5-2.5-2.5v5H4v-9l4 4 3-3 3 3 4-4v9h-2z" fill="#ff3f6c"/>
          </svg>
          <button className="close-drawer" onClick={() => setIsDrawerOpen(false)}><X size={24} /></button>
        </div>
        <div className="drawer-content">
          <h4>CATEGORIES</h4>
          <nav className="drawer-categories">
            {CATEGORY_OPTIONS.map(cat => (
               <span key={cat} onClick={() => {
                  const p = new URLSearchParams(window.location.search);
                  if(cat === "All") p.delete("category");
                  else p.set("category", cat);
                  navigate("/?" + p.toString());
                  setIsDrawerOpen(false);
               }}>{cat.toUpperCase()}</span>
            ))}
          </nav>
        </div>
      </div>

      <header className="myntra-nav">
        <div className="nav-left">
          <div className="hamburger-menu" onClick={() => setIsDrawerOpen(true)}>
            <Menu size={24} color="var(--text-main)" />
          </div>
          <div className="nav__brand" onClick={() => navigate("/")}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="myntra-logo">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-2.5 2.5-2.5-2.5v5H4v-9l4 4 3-3 3 3 4-4v9h-2z" fill="#ff3f6c"/>
            </svg>
          </div>
          <nav className="nav-categories">
            {CATEGORY_OPTIONS.slice(1, 6).map(cat => (
               <span key={cat} onClick={() => {
                  const p = new URLSearchParams(window.location.search);
                  p.set("category", cat);
                  navigate("/?" + p.toString());
               }}>{cat.toUpperCase()}</span>
            ))}
          </nav>
        </div>

        <div className={`nav-center ${isSearchOpen ? "search-active" : ""}`}>
          <form className="nav__search" onSubmit={(e) => { submit(e); setIsSearchOpen(false); }}>
            <div className="search-icon-wrapper" onClick={() => setIsSearchOpen(true)}>
               <Search size={18} color="#696e79" />
            </div>
            <input
              className={`nav__input ${isSearchOpen ? "visible" : ""}`}
              placeholder="Search for products, brands and more"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {isSearchOpen && (
               <div className="close-search-mobile" onClick={(e) => { e.stopPropagation(); setIsSearchOpen(false); }}>
                 <X size={18} color="#696e79" />
               </div>
            )}
          </form>
        </div>

        <div className="nav-right">
           <div className="filter-box">
               <div className="action-item" onClick={() => setFilterOpen(!filterOpen)}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '4px'}}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                 <span className="action-label">Filters</span>
               </div>
               {filterOpen && (
                <div className="filter-dropdown">
                  <h4>Refine Results</h4>
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
                    placeholder="₹ MIN"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters((v) => ({ ...v, minPrice: e.target.value }))
                    }
                  />

                  <label>Max Price</label>
                  <input
                    type="number"
                    placeholder="₹ MAX"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((v) => ({ ...v, maxPrice: e.target.value }))
                    }
                  />

                  <button className="apply-btn" onClick={applyFilters}>
                    APPLY
                  </button>
                </div>
              )}
           </div>

           {user ? (
              <div className="action-item profile-dropdown-wrapper">
                <User size={20} />
                <span className="action-label">Profile</span>
                <div className="profile-dropdown">
                    <div className="profile-header">
                       <p className="bold">Hello {user.name}</p>
                       <p className="phone">{user.email}</p>
                    </div>
                    <div className="profile-links">
                       <Link to="/my-products">My Products</Link>
                       <Link to="/add-product">Sell</Link>
                    </div>
                    <div className="profile-logout">
                       <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
              </div>
           ) : (
              <div className="action-item">
                 <Link to="/login" className="action-link">
                   <User size={20} />
                   <span className="action-label">Login</span>
                 </Link>
              </div>
           )}
           
           <div className="action-item">
              <Heart size={20} />
              <span className="action-label">Wishlist</span>
           </div>

           <div className="action-item bag-icon" onClick={() => navigate('/cart')}>
              <ShoppingBag size={20} />
              <span className="action-label">Bag</span>
           </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;