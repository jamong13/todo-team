import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { FaBars, FaXmark } from "react-icons/fa6";

export default function Header({ activeMenu }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "home", label: "홈", path: "/" },
    { id: "todo", label: "뭐 하지", path: "/todo" },
    { id: "towear", label: "뭐 입지", path: "/towear" },
    { id: "towatch", label: "뭐 보지", path: "/towatch" },
    { id: "toeat", label: "뭐 먹지", path: "/toeat" },
  ];
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">오늘 뭐하지?</Link>
          </div>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`nav-button ${
                  activeMenu === item.id ? "active" : ""
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mobile-nav">
          <div className="mobile-nav-items">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`mobile-nav-button ${
                  activeMenu === item.id ? "active" : ""
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
