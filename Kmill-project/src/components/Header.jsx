import React from "react";
import "./cssMainComp/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="logoCOOKIE.png" alt="Cookie" className="cookie-image" />
      </div>
      <nav className="nav">
        <div className="nav-left">
          <ul>
            <li>
              <Link to="Inicio">Inicio</Link>
            </li>
            <li>
              <Link to="Productos">Productos</Link>
            </li>
            <li>
              <Link to="nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="#footer">Contacto</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="login">
        <ul>
          <li>
            <Link to="login">Ingresar</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
