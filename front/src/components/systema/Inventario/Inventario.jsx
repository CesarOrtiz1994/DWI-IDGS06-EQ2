import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute, useAuth } from "../../../Auth/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import ModalAddStock from "./ModalAddStock";
import { ToastContainer } from "react-toastify";

export default function Inventario() {
  const auth = useAuth();

  const [inactive, setInactive] = React.useState(false);
  const [materiales, setMateriales] = useState([]);
  const endPoint = "http://localhost:8000/api/materiales";

  const [showStock, setShowStock] = useState(false);
  const [id, setId] = useState(0);
  const [nomMaterial, setNomMaterial] = useState("");

  const handleClose = () => {
    setShowStock(false);
    getMateriales();
  };

  const handleShowStock = (id, nombre) => {
    setShowStock(true);
    setNomMaterial(nombre);
    setId(id);
  };

  useEffect(() => {
    getMateriales();
  }, []);

  const getMateriales = async () => {
    await axios.get(`${endPoint}`).then((response) => {
      setMateriales(response.data.materiales);
    });
  };

  if (auth.dataUser.rol !== 2) {
    return <Navigate to="/" />;
  }

  return (
    <AuthRoute>
      <Menu
        onCollapse={(inactive) => {
          //console.log(inactive);
          setInactive(inactive);
        }}
      />
      <div className={`conter ${inactive ? "inactive" : ""}`}>
        <h1>Inventario</h1>

        <div className="divhr"></div>
        <br />

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Stock</th>
                <th scope="col">Entradas</th>
              </tr>
            </thead>
            <tbody>
              {materiales.map((material) => (
                <tr key={material.id}>
                  <td>{material.nombre}</td>
                  <td>{material.descripcion}</td>
                  <td>{material.stock}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleShowStock(material.id, material.nombre)}
                    >
                      <FiPlus /> Stock
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <ModalAddStock show={showStock} handleClose={handleClose} id_material={id} nom_material={nomMaterial} />

      <ToastContainer />

    </AuthRoute>
  );
}
