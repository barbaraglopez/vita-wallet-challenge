import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Sidebar.css";

export const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useContext(ThemeContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const Menus = [
    { title: "Inicio", url: "/home" },
    { title: "Transferir", url: "/transfer" },
    { title: "Intercambiar", url: "/exchange" },
    { title: "Crypto", url: "/home" },
    { title: "Perfil", url: "/home" },
  ];

  return (
    <div className="sidebar-container">
      <button className="hamburger-button" onClick={toggleNav}>
        &#9776;
      </button>
      <div className={`sidebar ${isNavOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleNav}>
          &times;
        </button>
        <ul className="sidebar-menu">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(menu.url);
                setIsNavOpen(false);
              }}
              className="sidebar-item"
            >
              {menu.title}
            </li>
          ))}
          <div className="separator"></div>
          <li
            onClick={() => {
              signOut();
            }}
            className="sidebar-item"
          >
            Cerrar Sesión
          </li>
        </ul>
      </div>
    </div>
  );
};
