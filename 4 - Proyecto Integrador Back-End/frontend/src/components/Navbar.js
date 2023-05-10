import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.jpg";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="container-fluid">
      <header className="headerContainer">
        <div className="navbar-logo">
          <NavLink exact to="/" className="navbar-brand">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="pageTitle">
          <h2>¡Bienvenidos a Tienda El Socorro!</h2>
        </div>
      </header>

      <nav className="navbar">
        <ul className="navbar-links mx-auto">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/cart" activeClassName="active">
              Carrito <i class="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li>
          {/* <li>
            <NavLink exact to="/login" activeClassName="active">
              Login
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
