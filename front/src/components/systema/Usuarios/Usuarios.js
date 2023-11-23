import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute, useAuth } from "../../../Auth/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import ModalNewUser from "./ModalNewUser";
import ModalEditUser from "./ModalEditUser";
import { ToastContainer, toast } from "react-toastify";

export default function Usuarios() {
  const auth = useAuth();
  const [inactive, setInactive] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const endPoint = "http://localhost:8000/api/";

  const [showNuevo, setShowNuevo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = () => {
    setShowNuevo(false);
    setShowEdit(false);
    getUsuarios();
  };

  const handleShowNuevo = () => {
    setShowNuevo(true);
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
    setId(id);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    const res = await axios.get(`${endPoint}users`);
    //console.log(res.data.users);
    setUsuarios(res.data.users);
  };

  const deleteUsuario = async (id) => {
    const res = await axios.delete(`${endPoint}users/${id}`);
    console.log(res);
    toast.success(res.data.message);
    getUsuarios();
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
          <h1>Usuarios</h1>
          <button className="btn btn-outline-success fs-5 mb-2" onClick={handleShowNuevo}>
            <AiOutlineUserAdd /> Nuevo usuario
          </button>
        </div>

        <div className="divhr"></div>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  {usuario.type === 1
                    ? "Administrador"
                    : `${usuario.type === 2 ? "Almacen" : "Jefe de area"}`}
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={() => deleteUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => handleShowEdit(usuario.id)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalNewUser show={showNuevo} handleClose={handleClose}/>
      <ModalEditUser show={showEdit} handleClose={handleClose} id_user={id}/>

    </AuthRoute>
  );
}
