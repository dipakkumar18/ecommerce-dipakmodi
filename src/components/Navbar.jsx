import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle mobile menu
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilterData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  const filterByCategory = (cat) => {
    setFilterData(products.filter((data) => data.category.toLowerCase() === cat.toLowerCase()));
  };

  const filterByPrice = (range) => {
    let filteredData = [];
    if (range.includes("-")) {
      const [min, max] = range.split("-").map(Number);
      filteredData = products.filter((data) => data.price >= min && data.price <= max);
    } else {
      const min = Number(range);
      filteredData = products.filter((data) => data.price >= min);
    }
    setFilterData(filteredData);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3">
        <Link to={'/'} className="navbar-brand fw-bold text-warning">E-Commerce Project</Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          {/* ✅ Fixed Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/product/search/${searchTerm}`);
              setSearchTerm("");
            }}
            className="d-flex mx-auto search-bar position-relative"
          >
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-warning position-absolute end-0 top-0 bottom-0" type="submit">
              <span className="material-symbols-outlined">search</span>
            </button>
          </form>

          {/* Right Section (Cart, Profile, Auth Buttons) */}
          <ul className="navbar-nav ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to={'/cart'} className="nav-link position-relative">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    {cart?.items?.length > 0 && (
                      <span className="badge bg-danger rounded-circle position-absolute cart-badge">
                        {cart?.items?.length}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => { logout(); navigate('/login') }}
                    className="btn btn-danger logout-btn ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={'/register'} className="btn btn-info register-btn ms-2">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="btn btn-success login-btn ms-2">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* ✅ Filter Submenu (Only Visible on Home Page) */}
      {location.pathname === '/' && (
        <div className="sub_bar p-2 d-flex flex-wrap justify-content-center">
          <button className="btn items m-1" onClick={() => setFilterData(products)}>No Filter</button>
          <button className="btn items m-1" onClick={() => filterByCategory("Mobile")}>Mobiles</button>
          <button className="btn items m-1" onClick={() => filterByCategory("Laptop")}>Laptops</button>
          <button className="btn items m-1" onClick={() => filterByCategory("Camera")}>Camera</button>
          <button className="btn items m-1" onClick={() => filterByCategory("Headphone")}>Headphone</button>

          <select className="items price-filter" onChange={(e) => filterByPrice(e.target.value)}>
            <option value="">Select Price Range</option>
            <option value="500-2000">₹500 - ₹2,000</option>
            <option value="2000-4000">₹2,000 - ₹4,000</option>
            <option value="4000-8000">₹4,000 - ₹8,000</option>
            <option value="8000-15000">₹8,000 - ₹15,000</option>
            <option value="15000-25000">₹15,000 - ₹25,000</option>
            <option value="25000">₹25,000+</option>
          </select>

        </div>
      )}
    </>
  );
};

export default Navbar;
