import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute, useAuth } from "../../../Auth/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
//import ModalAddStock from "./ModalAddStock";
import { ToastContainer, toast } from "react-toastify";
import ModalDetalle from "./ModalDetalle";

const endPoint = "http://localhost:8000/api/solicitudes";
const uslCambioEstado = "http://localhost:8000/api/solicitud";

export default function Solicitudes() {
  const auth = useAuth();

  const [inactive, setInactive] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [idSolicitud, setIdSolicitud] = useState(0);

  const [modalDetalle, setModalDetalle] = useState(false);

  const handleClose = () => {
    setModalDetalle(false);
  };

  const handleModalDetalle = (id) => {
    setModalDetalle(true);
    setIdSolicitud(id);
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const res = await axios.get(endPoint);
    setSolicitudes(res.data.solicitudes);
    console.log(res.data.solicitudes);
  };

  const surtido = async (id) => {
    await axios
      .put(`${uslCambioEstado}/${id}`, {
        estado: 2,
      })
      .then((response) => {
        //console.log(response);
        toast.success(response.data.message);
        getSolicitudes();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const entregado = async (id) => {
    await axios
      .put(`${uslCambioEstado}/${id}`, {
        estado: 3,
      })
      .then((response) => {
        //console.log(response);
        toast.success(response.data.message);
        getSolicitudes();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
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
        <h1>Solicitudes</h1>

        <div className="divhr"></div>
        <br />

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Status</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitudes) => (
                <tr key={solicitudes.id}>
                  <td>{solicitudes.id}</td>
                  <td>{solicitudes.user.name}</td>
                  <td>
                    {solicitudes.estado === 1
                      ? "pendiente por surtir"
                      : solicitudes.estado === 2
                      ? "surtido falta entregar"
                      : "entregado"}
                  </td>
                  <td>
                    {solicitudes.estado === 3 ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => {
                          solicitudes.estado === 1
                            ? surtido(solicitudes.id)
                            : entregado(solicitudes.id);
                        }}
                      >
                        {solicitudes.estado === 1 ? "Surtir" : "Entregar"}
                      </button>
                    )}

                    <button
                      className="btn btn-outline-info btn-sm me-2"
                      onClick={() => handleModalDetalle(solicitudes.id)}
                    >
                      <FiPlus /> Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalDetalle
        show={modalDetalle}
        handleClose={handleClose}
        idSolicitud={idSolicitud}
      />

      <ToastContainer />
    </AuthRoute>
  );
}
