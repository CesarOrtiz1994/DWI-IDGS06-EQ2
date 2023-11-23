import React, { useEffect, useState } from "react";
import "./menu.css";
import logo from "../../../img/logo.png";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsDoorClosedFill,
} from "react-icons/bs";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbPackages, TbReportMedical } from "react-icons/tb";
import MenuItems from "./MenuItems";
import { useAuth } from "../../../Auth/auth";

export default function Menu(props) {

  const [inactive, setInactive] = useState(false);

  let menuItems = [];

  const auth = useAuth();

  if (auth.dataUser.rol === 1) {
    menuItems = [
      {
        name: "Home",
        icon: <FaHome />,
        to: "/sistema",
      },
      {
        name: "Usuarios",
        icon: <FaUserCircle />,
        to: "/sistema/usuarios",
      },
      {
        name: "Materiales",
        icon: <FiPackage />,
        to: "/sistema/materiales",
      },
    ];
  } else if (auth.dataUser.rol === 2) {
    menuItems = [
      {
        name: "Home",
        icon: <FaHome />,
        to: "/sistema",
      },
      {
        name: "Inventario",
        icon: <TbPackages />,
        to: "/sistema/inventario",
      },
      {
        name: "Solicitudes",
        icon: <TbReportMedical />,
        to: "/sistema/solicitudes",
      },
    ];
  } else {
    menuItems = [
      {
        name: "Home",
        icon: <FaHome />,
        to: "/sistema",
      },
      {
        name: "Solicitar Material",
        icon: <TbReportMedical />,
        to: "/sistema/solicitar",
      },
    ];
  }

  useEffect(() => {
    props.onCollapse(inactive);
  }, [inactive]);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="toggle-menu-btn" onClick={() => setInactive(!inactive)}>
          {inactive ? (
            <BsFillArrowRightSquareFill />
          ) : (
            <BsFillArrowLeftSquareFill />
          )}
        </div>
        {inactive ? "" : <p>Bienvenido {auth.dataUser.name}</p>}
      </div>
      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItems, index) => (
            <MenuItems
              key={index}
              name={menuItems.name}
              icon={menuItems.icon}
              to={menuItems.to}
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer">
        <ul>
          <li>
            <a href="#" onClick={() => auth.logout()} className="menu-item">
              <div className="menu-icon">
                <BsDoorClosedFill />
              </div>
              <span>Cerrar Sesión</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
