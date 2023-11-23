import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute, useAuth } from "../../../Auth/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { TbPackageImport } from "react-icons/tb";
import ModalNewMaterial from "./ModalNewMaterial";
import ModalEditMaterial from "./ModalEditMaterial";
import { ToastContainer, toast } from "react-toastify";

export default function Materiales() {
  const auth = useAuth();
  const [inactive, setInactive] = React.useState(false);
  const [materiales, setMateriales] = useState([]);
  const endPoint = "http://localhost:8000/api/materiales";
  const endPoint1 = "http://localhost:8000/api/material";

  const [showNuevo, setShowNuevo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = () => {
    setShowNuevo(false);
    setShowEdit(false);
    getMateriales();
  };

  const handleShowNuevo = () => {
    setShowNuevo(true);
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
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

  const deleteMaterial = async (id) => {
    await axios.delete(`${endPoint1}/${id}`).then((response) => {
      toast.success(response.data.message);
      getMateriales();
    });
  };

  if (auth.dataUser.rol !== 1) {
    return <Navigate to="/" />;
  }

  return (
    <AuthRoute>
      <ToastContainer />
      <Menu
        onCollapse={(inactive) => {
          //console.log(inactive);
          setInactive(inactive);
        }}
      />
      <div className={`conter ${inactive ? "inactive" : ""}`}>
        <div className="d-flex justify-content-between">
          <h1>Materiales</h1>
          <button
            className="btn btn-outline-success fs-5 mb-2"
            onClick={handleShowNuevo}
          >
            <TbPackageImport /> Nuevo Material
          </button>
        </div>

        <div className="divhr"></div>
        <br />

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materiales.map((material) => (
                <tr key={material.id}>
                  <td>{material.nombre}</td>
                  <td>{material.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleShowEdit(material.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteMaterial(material.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalNewMaterial show={showNuevo} handleClose={handleClose} />
      <ModalEditMaterial show={showEdit} handleClose={handleClose} id_material={id} />
    </AuthRoute>
  );
}
